import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDfqJfKQn1Z9wAp5h4YDw84NGJySysMVHI",
    authDomain: "netflix-clone-a3d83.firebaseapp.com",
    projectId: "netflix-clone-a3d83",
    storageBucket: "netflix-clone-a3d83.appspot.com",
    messagingSenderId: "492322908368",
    appId: "1:492322908368:web:9810dac3e760bab40716d5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join("  "));

    }
}


const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join("  "));
    }
}

const logout = () => {

    signOut(auth)
}


export { auth, db, login, signup, logout };