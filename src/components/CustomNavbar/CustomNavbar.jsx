// This is the navbar of the homepage. It contains logo at the left and login/logout button, plus icon at the right.
import {AiFillFileAdd} from 'react-icons/ai'
const CustomNavbar = () => {
    return (
        <div>
            <div className="navbar bg-orange-50 px-12 pt-6">
                <div className="navbar-start">
                    
                    <h1 className="normal-case text-2xl font-bold text-slate-700 px-0">MemoTack</h1>
                </div>
                
                <div className="navbar-end">
                    <AiFillFileAdd className=' me-4 text-orange-400 text-4xl hover:text-5xl transition-all cursor-pointer'></AiFillFileAdd>
                    <a className="btn bg-green-200 hover:bg-green-300 transition-all">Login</a>
                </div>
            </div>
        </div>
    );
};

export default CustomNavbar;