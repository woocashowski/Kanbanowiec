import axios from 'axios';

function GetUrl(name) {
    return (process.env.REACT_APP_MODE === 'dev') ? ('http://localhost:8080/' + name) : (window.location.href + name);
}

async function Request(method, name, body) {
    try {
        const response = await method(GetUrl(name), body, {crossdomain: true});
        return {response, succeed: true};
    }
    catch (error) {
        return {error, succeed: false};
    }
}

async function TryLogin(email, password) {
    return await Request(axios.post, 'login', {email,password} );

}

async function TrySignUp(email, password) {
    let result = await Request(axios.post, 'signup', {email,password} );
    result.succeed = result.response.data.success;
    return result;
}

async function Verify(email, token) {
    return await Request(axios.post, 'verify', {email,token} );
}

async function GetTable(email,token) {
    return await Request( axios.post,'table', {email,token} );
}

async function UpdateTable(email,token, table) {
    return await Request(axios.put, 'update', {email,token,table});
}

export default { TryLogin, TrySignUp, Verify, GetTable, UpdateTable };