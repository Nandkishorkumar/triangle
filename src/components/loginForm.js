import { Modal } from '@material-ui/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import '../App.css';
import app from './required';


const Loginform = (props) => {
    var currentdate = new Date();
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [email_flg, setEmail_flg] = useState(false)
    const [password_flg, setpassword_flg] = useState(false)
    const [hasaccount, sethasaccount] = useState(true)
    // const[error_flg,set_error_flg]=useState(false)
    const db = getFirestore(app);
    function emailOnChange(e) {
        setemail(e.target.value)
        setEmail_flg(false)
    }
    async function fetch_profile(args) {
        const docRef = doc(db, "Profile", args.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            props.setData(docSnap.data())
            // console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }

    }
    function set_profile(args) {
        setDoc(doc(db, "Profile", args.uid), {
            name: "",
            account_created_date: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`,
            account_create_time: `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}:${currentdate.getMilliseconds()}`,
            WhatsApp_number: 0,
            contact_number: 0,
            access_type: "n/a",
            email: args.email,
            following_lead: ""

        });
    }
    function newAccount() {
        sethasaccount(!hasaccount)
    }
    function submit() {
        // console.log(email.slice(-10))

        if (email.length === 0) {
            setEmail_flg(true)

        }
        else if (password.length === 0) {
            setpassword_flg(true)
        }
        else if (email.slice(-10) === '@gmail.com') {
            login()

        }
        else {
            setEmail_flg(true)
            // setpassword_flg(true)
        }

    }
    function passwordOnChange(e) {
        setpassword(e.target.value)
        setpassword_flg(false)

    }
    function handelClose() {
        props.refreshPage()
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
                const user = userCredential.user;
                set_profile(user)
                props.setauth(user)
                fetch_profile(user)
                // console.log(user)
                handelClose()

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode)
                setEmail_flg(true)
                setpassword_flg(true)
                // debugger
            });
    }
    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                fetch_profile(user)
                props.setauth(user)
                // console.log(user)
                handelClose()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setEmail_flg(true)
                setpassword_flg(true)
                // console.log(errorMessage)
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
                    {
                        hasaccount ?
                            <button className='signIn' onClick={() => submit()}>sign In</button>
                            :
                            <button className='signIn' onClick={() => create_id()}>sign Up</button>
                    }
                    {
                        hasaccount ?
                            <p className='create_new_account' onClick={() => newAccount()}>create new account !</p>
                            :
                            <p className='create_new_account' onClick={() => newAccount()}>sign In</p>
                    }


                </div>
            </>
        </Modal>
    );
}

export default Loginform;
