import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAhuSdGILVOQo_qSHl77k7ICjtGR38TVds",
    authDomain: "makeathon-afcae.firebaseapp.com",
    projectId: "makeathon-afcae",
    storageBucket: "makeathon-afcae.appspot.com",
    messagingSenderId: "50639758743",
    appId: "1:50639758743:web:05a6b6f4ac36bd810690d2",
    measurementId: "G-P4SQREV40R"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default firebase
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const Gtoken = new firebase.auth.GithubAuthProvider()