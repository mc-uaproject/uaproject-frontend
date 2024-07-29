export async function fetchSession() {
    try {
        console.log('Fetching session...'); // Add this log
        const response = await fetch('/api/session');
        console.log('Session response status:', response.status); // Add this log

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const session = await response.json();
        console.log('Session data fetched:', session); // Add this log
        return session;
    } catch (error) {
        console.error('Failed to fetch session:', error);
        return null;
    }
}
