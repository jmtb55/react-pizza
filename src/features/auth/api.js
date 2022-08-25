const LOGIN_URL = 'http://localhost:3000/api/login';

export const callLoginEndpoint = (body) => {
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
    };
    return fetch(LOGIN_URL, options);
}
