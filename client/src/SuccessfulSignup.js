import React from "react";
import { Button } from "react-bootstrap";
import ""
export default function SuccessfulSignup() {
    return (
        <div>
            <p>You successfully created your account!</p>
            <form action="/">
            <Button block bsSize="large" type="submit" >
                Go back to login page
            </Button>
            </form>
        </div>
    );
}