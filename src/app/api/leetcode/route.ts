import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'Subham9928';

    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                profile {
                    ranking
                }
            }
        }
    `;

    try {
        const res = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { username } }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
    }
}
