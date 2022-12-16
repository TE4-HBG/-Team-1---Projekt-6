import React, { isValidElement, useEffect, useState } from "react";
import globals from "../globals";
import server from "../server"


export default function SignUpInfo(props) {

    const [UserNamePromt, setUserNamePromt] = useState("");
    const [PasswordPromt, setPasswordPromt] = useState("");
    return (
        <>
            <div className="LoginForm">
                <h2 className="Title">
                    Create account!
                </h2>
            </div>
            <div>
                <h5 className="TextPromtForUsername">
                    Username or E-mail adress:
                 </h5>
                <input className="Username" type="text" value={UserNamePromt} onChange={function (event) { setUserNamePromt(event.target.value); console.log(event.target.value) }}>
                </input>
            </div>
            <div>
                <h5 className="TextPromtForPassword">
                    Password:
                </h5>
                <input className="Password" type="text" value={PasswordPromt} onChange={function (event) { setPasswordPromt(event.target.value); console.log(event.target.value) }}>
                </input>
            </div>
            <div className="Sign_up">
                <button onClick={function () {server.signup(UserNamePromt, PasswordPromt, (data) => {globals.userId = data}) }}>
                    <h6>
                        Sign up!
                    </h6>
                </button>
            </div>
        </>
    )


}