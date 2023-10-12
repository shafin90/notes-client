// This is the home page of this web application. In this page user will see his/her list of all notes.
//  User will see button to add note and login/logout button.

import CustomNavbar from "../../components/CustomNavbar/CustomNavbar";
import NoteList from "../../components/NoteList/NoteList";

const Home = () => {
    return (
        <div className=" bg-sky-50 w-screen h-screen">
            <CustomNavbar></CustomNavbar>
            <NoteList></NoteList>
            
        </div>
    );
};

export default Home;