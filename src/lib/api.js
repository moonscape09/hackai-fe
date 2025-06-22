const API_URL = process.env.NEXT_PUBLIC_API_URL;

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const NEW_API_URL = process.env.NEW_API_URL;

const postReel = async (reelURL) => {
    try {
        const response = await fetch(`https://hackai-main-7vjska.laravel.cloud/api/linkedin`, {
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

const getPost = async (postID) => {
    try {
        const response = await fetch(`${API_URL}posts?select=*&id=eq.${postID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Failed to get post:', error);
        throw error;
    }
}

const getComments = async (postID) => {
    try {
        const response = await fetch(`${API_URL}comments?select=*&post_id=eq.${postID}&order=icp_score.desc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Failed to get comments:', error);
        throw error;
    }
}

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

export { postReel, getAnalytics, getComments, getPost };