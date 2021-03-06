import React from 'react'
import Button from '@material-ui/core/Button'
import firebase, { auth, firestore } from "../firebase"
const skills = [{ name: 'web design', valid: false }, { name: 'Wordpress', valid: false }, { name: 'microsoft word', valid: false }, { name: 'management', valid: false }, { name: 'excel', valid: false }]

export const Signin = () => {


    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh", width: '100vw' }}>
        <div style={{ height: "30%", width: '100%', display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
            <Button
                variant="contained"
                color="secondary"
                style={{ width: "70%" }}
                onClick={() => {
                    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((result) => {
                        let user = result.user
                        firestore.collection("users").doc(user.uid).onSnapshot((snap) => {
                            if (snap.exists) {
                                return;
                            }
                            else {
                                firestore.collection("users").doc(user.uid).set({
                                    name: user.displayName,
                                    email: user.email,
                                    skills: skills,
                                    workexp: [{ title: "mock", from: "mock", to: "mock", about: "mock" }],
                                    achievements: [{ title: "mock", dated: "mock", about: "mock" }],
                                    about: ""
                                })
                            }
                        })
                    })
                }}
            >
                SignIn with Google
        </Button>
            <h3>or</h3>
            <Button
                variant="contained"
                style={{ width: "70%" }}
                onClick={() => {
                    auth.signOut()
                }}
            >
                SignIn with aadhar
        </Button>
        </div>
    </div >
}