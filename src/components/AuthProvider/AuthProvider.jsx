import { createContext, useEffect, useState } from "react";
import { app } from "../../../firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const authContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    // State declaration==========================================================================================
    const [user, setUser] = useState(null); //loggedIn user's information
    const [name, setName] = useState(null); // name of from registration and login form
    const [email, setEmail] = useState(null); // email of from registration and login form
    const [password, setPassword] = useState(null); // password of from registration and login form
    const [confirmPassword, setConfirmPassword] = useState(null); // confrim password of from registration and login form
    const [error, setError] = useState(null); // error while completing registration and login or any functionalities
    const [noteslist, setNotesList] = useState(null) // List of all notes
    const [note, setNote] = useState(null) // particular note that is being wriiten by user
    const [noteTitle, setNoteTitle] = useState(null) // Title of the note

    // Function to create account, login account====================================================================

    // 1. Function to create account======
    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    // 2. Function to login account with email, password======
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    // 3. Function to sign in with google======
    const handleGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUser(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                setError(errorMessage)
                // ...
            });

    }

    // 4. Function to logout account========
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null)
        }).catch((error) => {
            // An error happened.
            setError(error)
        });
    }


    // CRUD operation = Post, Delete, Update and Get all the data from Database=========================================

    // 1. Function to handle Post method========
    const handlePost = () => {
        fetch('http://localhost:5000/addNote', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title: noteTitle, note: note, email: user?.email })
        })
            .then(res => res.json())
            .then(data => console.log(data))

    }

    // 2. Function to handle Delete operation========
    const handleDelete = () => {

    }

    // 3. Function to Get data =============
    const handleGetData = () => {
        fetch('http://localhost:5000/noteCollection')
        .then(res=>res.json())
        .then(data=>setNotesList(data))

    }

    // 4. Function to Update data===========
    const handleUpdate = () => {

    }



    // Observer==========================================================================================================
    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);


    // all state and function that will be used all over the application==================================================
    const passedValue = {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        user,
        error,
        setUser,
        handleGoogle,
        handleLogin,
        handleRegister,
        handleLogout,
        handlePost,
        handleDelete,
        handleUpdate,
        handleGetData,
        setNote,
        setNoteTitle,
        noteslist
    }

    return (
        <authContext.Provider value={passedValue}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;