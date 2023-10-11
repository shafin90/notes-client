import { useContext } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../components/AuthProvider/AuthProvider';

const LoginPage = () => {
    // Recieving state and fucntion from AuthProvider component through context API
    const { user, setEmail, setPassword, handleLogin, handleGoogle } = useContext(authContext);

    // declaring useNavigate hook
    const navigate = useNavigate()

    // if the state user!==null then user will be redirected to home page. this things happene after completing login
    if (user !== null) {
        navigate('/home')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                        placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <button
                        onClick={handleLogin}
                        className="bg-sky-700 hover:bg-sky-900 transition-all text-white font-semibold py-2 px-4 rounded-lg w-full"
                    >
                        Login
                    </button>
                </div>
                <div className="text-center">
                    <p className="text-gray-600 text-sm">Or</p>
                    <button
                        className=" flex justify-center items-center mt-2 transition-all bg-red-700 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-lg w-full"
                        onClick={handleGoogle}
                    >
                        <AiOutlineGoogle className=' me-2 text-2xl'></AiOutlineGoogle>
                        Sign in with Google
                    </button>
                </div>
                <p className=' text-sm mt-4  text-slate-500'>Dont have an account?<Link to='/registration' className=' font-bold ms-2'>Registration</Link> </p>
            </div>
        </div>
    );
};

export default LoginPage;
