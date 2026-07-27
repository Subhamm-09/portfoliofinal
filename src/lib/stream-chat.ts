export type ChatMessage = { role: "user" | "assistant"; content: string };

export type CategoryType = "job_inquiry" | "freelance" | "collaboration" | "general" | null;

export async function streamChat({
    messages,
    context,
    onDelta,
    onToolCall,
    onDone,
    onError,
}: {
    messages: ChatMessage[];
    context?: Record<string, any>;
    onDelta: (text: string) => void;
    onToolCall?: (name: string, args: Record<string, unknown>) => void;
    onDone: () => void;
    onError: (error: string) => void;
}) {
    try {
        const resp = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages, context }),
        });

        if (!resp.ok) {
            const data = await resp.json().catch(() => ({ error: "Request failed" }));
            onError(data.error || `Error ${resp.status}`);
            return;
        }

        if (!resp.body) {
            onError("No response body");
            return;
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let streamDone = false;
        let toolCallName = "";
        let toolCallArgs = "";

        while (!streamDone) {
            const { done, value } = await reader.read();
            if (done) break;
            textBuffer += decoder.decode(value, { stream: true });

            let newlineIndex: number;
            while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
                let line = textBuffer.slice(0, newlineIndex);
                textBuffer = textBuffer.slice(newlineIndex + 1);

                if (line.endsWith("\r")) line = line.slice(0, -1);
                if (line.startsWith(":") || line.trim() === "") continue;
                if (!line.startsWith("data: ")) continue;

                const jsonStr = line.slice(6).trim();
                if (jsonStr === "[DONE]") {
                    streamDone = true;
                    break;
                }

                try {
                    const parsed = JSON.parse(jsonStr);
                    const choice = parsed.choices?.[0];
                    if (!choice) continue;

                    const delta = choice.delta;
                    if (delta?.content) {
                        onDelta(delta.content);
                    }

                    if (delta?.tool_calls) {
                        for (const tc of delta.tool_calls) {
                            if (tc.function?.name) toolCallName = tc.function.name;
                            if (tc.function?.arguments) toolCallArgs += tc.function.arguments;
                        }
                    }

                    if (choice.finish_reason === "tool_calls" && toolCallName && onToolCall) {
                        try {
                            const args = JSON.parse(toolCallArgs);
                            onToolCall(toolCallName, args);
                        } catch {
                            // partial args
                        }
                        toolCallName = "";
                        toolCallArgs = "";
                    }
                } catch {
                    textBuffer = line + "\n" + textBuffer;
                    break;
                }
            }
        }

        if (textBuffer.trim()) {
            for (let raw of textBuffer.split("\n")) {
                if (!raw) continue;
                if (raw.endsWith("\r")) raw = raw.slice(0, -1);
                if (raw.startsWith(":") || raw.trim() === "") continue;
                if (!raw.startsWith("data: ")) continue;
                const jsonStr = raw.slice(6).trim();
                if (jsonStr === "[DONE]") continue;
                try {
                    const parsed = JSON.parse(jsonStr);
                    const content = parsed.choices?.[0]?.delta?.content;
                    if (content) onDelta(content);
                } catch { /* ignore */ }
            }
        }

        if (toolCallName && onToolCall) {
            try {
                const args = JSON.parse(toolCallArgs);
                onToolCall(toolCallName, args);
            } catch { /* ignore */ }
        }

        onDone();
    } catch (err) {
        onError((err as Error).message);
    }
}
