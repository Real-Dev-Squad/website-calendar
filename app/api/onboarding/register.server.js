export async function register(data) {
    const baseUrl = process.env.API_HOST;
    const token = process.env.AUTH_TOKEN;
    const query = '/api/v1/users/self';
    try {
        const request = await fetch(baseUrl + query, {
            method:'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const response = await request.json();
        if(response.message === 'User data updated') {
            return {username: data.username}
        }
        return response;
    } catch(error) {
        console.error(error);
        return error
    }
    
}