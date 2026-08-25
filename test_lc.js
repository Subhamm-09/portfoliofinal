async function getLeetCode() {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  const res = await globalThis.fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { username: 'Subham9928' } })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
getLeetCode().catch(console.error);
