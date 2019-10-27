import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { TryLogin } from './api';

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const callback = props.callback;

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        let resp = await TryLogin(email, password);
        console.log(resp);
        if (resp.succeed) {
            console.log(resp);
            window.localStorage.setItem("User", JSON.stringify(resp.response.data));
            setLoading(false);
            callback();
        }
        else {
            console.log(resp.error.response);
            console.log(resp.error.message);
            setLoading(false);
            alert(resp.error.message); //+(resp.error.response) ? (' \n Status: ' + resp.error.response) : (''));
        }
    }

    return (
        <div className="LoginContainer">
            <h3>Sign in to Kanabanowiec</h3>
            <div className="Login">

                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!validateForm() || loading} type="submit">
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </form>
            </div>
            <div>
                <a href="/signup">Dont have an account?</a>
            </div>
        </div>
    );
}

