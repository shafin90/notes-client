import { createContext, useEffect, useState } from "react";
import { app } from "../../../firebase.config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

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
    const [reload, setReload] = useState(true) // When delete happens, then all the note collection need to be fetched again. This stats will play the role of dependancy there. When delete operation done, this state's value will be changed.
    const [selectedNoteId, setSelectedNoteId] = useState(null); // when user try bto update any note, then  user select that note from the list. that note's id will be stored here.


    // Function to create account, login account====================================================================

    // 1. Function to create account======
    const handleRegister = () => {
        console.log(1234)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const users = userCredential.user;
                // ...
                setUser(users)
                alert('Registration successfull')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('something wrong')
                // ..
            });
    }



    // 2. Function to login account with email, password======
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user)
                alert('login successfull')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                alert('something wrong')
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
                console.log(user)
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
    console.log(user)
    // 4. Function to logout account========
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser(null)
            alert('logout successfull')
        }).catch((error) => {
            // An error happened.
            setError(error)
        });
    }


    // CRUD operation = Post, Delete, Update and Get all the data from Database=========================================

    // 1. Function to handle Post method========
    const handlePost = () => {
        fetch('https://notes-server-ygw4.vercel.app/addNote', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title: noteTitle, note: note, email: user?.email })
        })
            .then(res => res.json())
            .then(data => console.log(data))
        
        alert('note added')

    }

    // 2. Function to handle Delete operation========
    const handleDelete = (_id) => {
        fetch(`https://notes-server-ygw4.vercel.app/deleteNote/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = noteslist.filter(item => item._id !== _id);
                setNotesList(remaining);
            })
        setReload(!reload)
        alert('delete the note')
    }

    // 3. Function to Get data =============
    const handleGetData = () => {
        fetch('https://notes-server-ygw4.vercel.app/noteCollection')
            .then(res => res.json())
            .then(data => setNotesList(data))

    }

    // 4. Function to Update data===========
    const handleUpdate = () => {
        console.log(selectedNoteId)
        fetch(`https://notes-server-ygw4.vercel.app/updateNote/${selectedNoteId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ title: noteTitle, note: note, email: user?.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('user updated successfully')
                }
            })

        setSelectedNoteId(null);
        setReload(!reload);

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
        noteslist,
        reload,
        setReload,
        noteTitle,
        note,
        setSelectedNoteId,
        selectedNoteId
    }

    return (
        <authContext.Provider value={passedValue}>
            {children}

        </authContext.Provider>
    );
};

export default AuthProvider;