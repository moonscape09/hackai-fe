const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const postReel = async (reelURL) => {
    try {
        const response = await fetch(`${API_URL}/reels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: reelURL }),
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Failed to post reel:', error);
        throw error;
    }
}

export { postReel };

const getAnalytics = async () => {
    try {
        const response = await fetch(`${API_URL}/analytics`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        return await response.json();
    } catch (error) {
        console.error('Failed to get analytics:', error);
        throw error;
    }
}