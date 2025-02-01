const baseURL = 'http://localhost:3030';

export async function requester(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if(data){
        options.headers['Content-Type'] = 'application/json';
        options.body =JSON.stringify(data);
    }

    const auth = localStorage.getItem('auth');
    const accessToken = auth ? JSON.parse(auth) : null;

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken;
    }
    
    try{
        const response = await fetch(`${baseURL}/${url}`, options);

        if(response.status == 204){
            return 'success'
        }

        if(!response.ok){
            return response.status;
        } else {
            return response.json();
        }
    } catch (err){
        console.log('Error in requester');
        console.log(err.message);
        
        
    }
}

export const get = (url, data) => requester('GET', url, data);
export const post = (url, data) => requester('POST', url, data);
export const put = (url, data) => requester('PUT', url, data);
export const del = (url, data) => requester('DELETE', url, data);