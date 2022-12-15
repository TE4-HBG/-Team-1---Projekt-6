import { useState } from "react";
import "../Popup.css";
import LoginInfo from "./LoginInfo";
import SignUpInfo from "./SignUpInfo";

export default function Popup(props) {
const [SignUp, setSignUp] = useState(false);


  const toggleModal = () => {
    props.setState(!props.state);
  };
  const toggleSignUp =() => {
    setSignUp(!SignUp); 
  }
  if (props.state) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {props.state && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">

            {SignUp ? <SignUpInfo/>: <LoginInfo/>}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            <button className="toggle-signup" onClick={toggleSignUp}>
              Sign up
            </button>
          </div>
        </div>
      )}
    </>
  );
}
