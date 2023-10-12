// This page contains the note for user to view note

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../components/AuthProvider/AuthProvider";

const ViewNote = () => {
    // Recieving state and function from AuthProvider through context API
    const {noteslist} = useContext(authContext)
    const [specificNote, setSpecificNote] = useState(null);
    const {id} = useParams(); // Getting the ID of the specific note

    // Filtering the note
    useEffect(()=>{
        const filteredNote = noteslist?.find(e=>e._id==id)
        setSpecificNote(filteredNote)

    },[]) 
    return (
        <div className=" w-screen h-screen bg-sky-50 pt-10">
            <h1 className=" font-bold text-center text-sky-900 text-4xl ">{specificNote?.title}</h1>
            <article className=" w-10/12 mx-auto mt-10">
                {specificNote?.note}
            </article>
        </div>
    );
};

export default ViewNote;