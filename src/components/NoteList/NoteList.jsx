//  This component contains the list of all notes
//  This component is shown in the homa page after customNavbar component

import { useContext, useEffect, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { AiFillDelete } from 'react-icons/ai'
import { GrDocumentUpdate } from 'react-icons/gr'
const NoteList = () => {
    // Riceving stat and function from AuthProvider through context API
    const { noteslist, handleGetData, reload, setReload, handleDelete, user } = useContext(authContext);

    // State declaration for this component
    const [filteredNote, setFilteredNotes] = useState(null);

    // Calling handleGetData function to fetch all the note from database
    useEffect(() => {
        handleGetData()
        // Filter loggedIN user's all notes from notelist
        const filteredNote = noteslist?.filter(e => e.email == user?.email)
        setFilteredNotes(filteredNote);
    }, [reload, setReload, handleGetData])





    return (
        <div className=" w-11/12 h-auto mx-auto mt-7 bg-sky-100">
            {
                filteredNote?.map(e => <div className=" flex justify-between items-center border-b-2  border-sky-700 px-9 py-3">
                    <h1 className=" text-2xl font-semibold">
                        {e.title}
                    </h1>

                    <div className=" flex justify-between items-center">
                        <GrDocumentUpdate className=" text-sky-800 text-2xl cursor-pointer"></GrDocumentUpdate>
                        <AiFillDelete onClick={() => handleDelete(e._id)} className=" text-red-800 text-2xl  ms-4 cursor-pointer"></AiFillDelete>

                    </div>
                </div>)
            }
        </div>
    );
};

export default NoteList;