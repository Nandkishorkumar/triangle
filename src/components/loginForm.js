import { Modal } from '@material-ui/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import '../App.css';


const Loginform = (props) => {
    // console.log(open)
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [email_flg, setEmail_flg] = useState(false)
    const [password_flg, setpassword_flg] = useState(false)
    function emailOnChange(e) {
        setemail(e.target.value)
        setEmail_flg(false)
    }
    function submit() {
        // console.log(email.slice(-10))

        if (email.length == 0) {
            setEmail_flg(true)

        }
        else if (password.length == 0) {
            setpassword_flg(true)
        }
        else if (email.slice(-10) == '@gmail.com') {
            login()
        }

    }
    function passwordOnChange(e) {
        setpassword(e.target.value)
        setpassword_flg(false)

    }
    function handelClose() {
        props.setopen(false)
    }
    const auth = getAuth();
    // function signIn() {
    //     signInWithPopup(auth, GoogleAuthProvider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             // ...
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.email;

    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             console.log(credential)
    //             // ...
    //         });
    // }
    function create_id() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }
    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                props.setauth(user)
                console.log(user)
                handelClose()
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
    return (
        <Modal style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }} open={props.open} onClose={handelClose} >
            <>
                <div className='popUp'>
                    <input type="email" className={email_flg ? 'inputEmailerror' : 'inputEmail'} placeholder='Email' value={email} onChange={(e) => emailOnChange(e)}></input>
                    <input type="password" className={password_flg ? 'inputPassworderror' : 'inputPassword'} placeholder='Password' value={password} onChange={(e) => passwordOnChange(e)}></input>
                    <button className='signInWithGoogle'
                    // onClick={() => signIn()}
                    >
                        <img alt="google img" src="/assets/img/Icon.svg" width="25px" height="25px" />
                        <p className='signInWithGoogleText'>
                            sign up with Google
                        </p>
                    </button>
                    <button className='signInWithGoogle'>
                        <img alt="google img" src="/assets/img/facebook.svg" width="25px" height="25px" />
                        <p className='signInWithGoogleText'>
                            sign up with facebook
                        </p>
                    </button>
                    <button className='signIn' onClick={() => submit()}>sign In</button>

                </div>
            </>
        </Modal>
    );
}

export default Loginform;
