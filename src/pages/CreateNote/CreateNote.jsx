// In this page user write their note.
// At the top, User have to give a title of the note
// After that, user can write the note
import { useContext } from 'react';
import { FaSave } from 'react-icons/fa'
import { GrUpdate } from 'react-icons/gr'
import { authContext } from '../../components/AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    // Reiciving State and Function from AuthProvider component through context API
    const { handlePost, setNote, setNoteTitle, noteTitle, note, selectedNoteId, handleUpdate } = useContext(authContext)

    // Initializing useNavigate hook
    const navigate = useNavigate();

    // Function to start post operation
    const post = () => {
        handlePost();
        navigate('/home')
    }

    const update = () => {
        handleUpdate();
    }


    return (
        <div className=" w-screen h-screen bg-sky-100  overflow-y-scroll overflow-x-hidden">
            {/* Title and save button container */}
            <div className=" flex justify-between items-center  p-12">
                {/* Title */}
                <input
                    onChange={e => setNoteTitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className=' w-6/12 rounded-md px-5 py-3 focus:outline-none text-3xl'
                    value={noteTitle}
                />

                {
                    selectedNoteId == null ?

                        <FaSave onClick={post} className=' text-sky-700 text-4xl hover:text-sky-900 cursor-pointer transition-all'></FaSave>
                        :
                        <GrUpdate onClick={update} className=' text-sky-700 text-4xl cursor-pointer'></GrUpdate>

                }




            </div>

            {/* Note writing */}
            <div className=' w-screen h-5/6 mt-5 flex justify-center items-start'>
                <textarea
                    onChange={e => setNote(e.target.value)}
                    type="text"
                    placeholder=' write your note here'
                    rows={16}
                    cols={160}
                    className=' p-6 bg-sky-50 focus:outline-none'
                    value={note}
                />
            </div>

        </div>
    );
};

export default CreateNote;