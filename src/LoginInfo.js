import React, { useState } from "react";
import {SendLogin} from "./RequestAPI"


export default function LoginInfo(props) {

    const [UserNamePromt, setUserNamePromt] = useState("");
    const [PasswordPromt, setPasswordPromt] = useState("");

    return (
        <>
            <div className="LoginForm">
                <h2 className="Title">
                    Login!
        </h2>
            </div>
            <div>
                <h5 className="TextPromtForUsername">
                    Username or E-mail adress:
          </h5>
                <input className="Username" type="text" value ={UserNamePromt} onChange ={function(event) {setUserNamePromt(event.target.value); console.log(event.target.value)} }>
                </input>
            </div>
            <div>
                <h5 className="TextPromtForPassword">
                    Password:
          </h5>
                <input className="Password" type="text" value={PasswordPromt} onChange={function(event) {setPasswordPromt(event.target.value); console.log(event.target.value)}}>
                </input>
            </div>
            <div className="Sign_in">
                <button onClick={function() {SendLogin(UserNamePromt,PasswordPromt,null)}}>
                    <h6>
                        Sign in!
          </h6>
                </button>
            </div>
        </>
    )


}