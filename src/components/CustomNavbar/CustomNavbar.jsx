// This is the navbar of the homepage. It contains logo at the left and login/logout button, plus icon at the right.
import { useContext } from 'react';
import { AiFillFileAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../AuthProvider/AuthProvider';

const CustomNavbar = () => {
    // Recieving state and function from AuthProvider through context API
    const { user, handleLogout, setNote, setNoteTitle, setSelectedNoteId } = useContext(authContext);

    // declaring useNavigate hook
    const navigate = useNavigate()

    // redirect user to login page so that user can login account or create account from registration page
    const login = () => {
        navigate('/login')
    }

    // Function to redirect user to note writing page
    const redirectTOWriteNote = ()=>{
        // Clearing note and noteTitle before redirecting user. Because, during updating note, note and notTitle value had been updated.
        setNote(null); 
        setNoteTitle(null);
        setSelectedNoteId(null); // making selectedId null. Because if user take an attept to update note, but desnt do that, setSelectedId will remain have a value. In that case user will see update button instead of post button when user will go for post a note.
        navigate('/note');
    }

    return (
        <div>
            <div className="navbar bg-sky-50 px-12 pt-6">
                <div className="navbar-start">

                    <h1 className="normal-case text-2xl font-bold text-sky-700 px-0">MemoTrack</h1>
                </div>

                <div className="navbar-end">
                    <AiFillFileAdd 
                    className= {
                        user!==null?
                        ' me-4 text-sky-500 text-4xl hover:text-5xl transition-all cursor-pointer':
                        'hidden'
                        }
                        onClick={redirectTOWriteNote} // redirect user to the note writing page
                        >

                        </AiFillFileAdd>
                    {user === null
                        ?
                        <a className="btn bg-sky-700 hover:bg-sky-800 text-slate-50 transition-all" onClick={login}>Login</a>
                        :
                        <a className="btn bg-red-700 hover:bg-red-900 text-slate-50 transition-all" onClick={handleLogout}>Logout</a>
                    }
                </div>
            </div>
        </div>
    );
};

export default CustomNavbar;