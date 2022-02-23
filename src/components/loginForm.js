import React from 'react';
import { Modal } from '@material-ui/core'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Loginform = (props) => {
    // console.log(open)
    function handelClose() {
        props.setopen(false)
    }
    const auth = getAuth();
    function signIn() {
        signInWithPopup(auth, GoogleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;                
                // The email of the user's account used.
                const email = error.email;
                
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(credential)
                // ...
            });
    }
    return (
        <Modal style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }} open={props.open} onClose={handelClose} >
            <>
                <div className='popUp'>
                    <input type="email" className='inputEmail' placeholder='Email' ></input>
                    <input type="email" className='inputPassword' placeholder='Password'></input>
                    <button className='signInWithGoogle' onClick={()=>signIn()}>
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
                    <button className='signIn'>sign In</button>

                </div>
            </>
        </Modal>
    );
}

export default Loginform;
