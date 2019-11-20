import axios from 'axios';

function GetUrl(path) {
    return (process.env.NODE_ENV === 'development') ? ('http://localhost:8080/' + path) : (window.location.href + path);
}

async function Request(method, path, body) {
    try {
        const response = await method(GetUrl(path), body, {crossdomain: true});
        return {response, succeed: true};
    }
    catch (error) {
        return {error, succeed: false};
    }
}

async function TryLogin(email, password) {
    return await Request(axios.post, 'login', {email, password} );

}

async function TrySignUp(email, password) {
    return await Request(axios.post, 'signup', {email, password} );
}

async function Verify(email, token) {
    return await Request(axios.post, 'verify', {email, token} );
}

async function GetTable(email, token) {
    return await Request( axios.post,'table', {email, token} );
}

async function UpdateTable(email, token, table) {
    return await Request(axios.put, 'update', {email, token, table});
}

export default { TryLogin, TrySignUp, Verify, GetTable, UpdateTable };