// This is the home page of this web application. In this page user will see his/her list of all notes.
//  User will see button to add note and login/logout button.

import { useContext } from "react";
import CustomNavbar from "../../components/CustomNavbar/CustomNavbar";
import NoteList from "../../components/NoteList/NoteList";
import { authContext } from "../../components/AuthProvider/AuthProvider";

const Home = () => {
    const {user} = useContext(authContext);
    return (
        <div className=" bg-sky-50 w-screen h-screen">
            <CustomNavbar></CustomNavbar>
            <NoteList></NoteList>
            {user==null&&<h1 className=" text-7xl font-extrabold text-sky-100 text-center mt-36">Login First</h1>}
            
        </div>
    );
};

export default Home;