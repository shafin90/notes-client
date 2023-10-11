import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../components/AuthProvider/AuthProvider';

const RegistrationPage = () => {
    // Recieving data from AuthProvider component through context API
    const { user, setName, setPassword, setConfirmPassword, setEmail, password, confirmPassword, handleRegister } = useContext(authContext)

    // State declaration for this component
    const [error, setError] = useState(null);
    const [visibility, setVisibility] = useState(false); // when password==confirmPassword and password.length>=8 then, visibility becomes true

    // declaring useNavigate hook
    const navigate = useNavigate()

    // if the state user!==null then user will be redirected to home page. this things happene after completing login
    if (user !== null) {
        navigate('/home')
    }

    // Function to handle registration process. When every details of the from is perfectly given, password and confirm password are same and password length is atleast 8 characters, visibility state becomes true
    const registration = ()=>{
        if(visibility){
            handleRegister();
        }
        else{
            alert('Fillup the form correctly')
        }
    }
    
    // Submit the form and check the password ok or not
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setTimeout(() => setError(null), 3000);
            setVisibility(true)
        } else if (password !== confirmPassword) {
            setVisibility(true)
            setError('Passwords do not match.');
            setTimeout(() => setError(null), 3000);
        } else {
            // Perform your registration logic here
            // You can send the formData to your API or perform validation
            // console.log('Registration data:');
            setVisibility(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registration</h2>
                {error && (
                    <div className="text-red-500 text-sm mb-4">{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"

                            onChange={e => setName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"

                            onChange={e => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"

                            onChange={e => setPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"

                            onChange={e => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className=" bg-sky-700 hover:bg-sky-900 text-white font-semibold py-2 px-4 rounded-lg w-full"
                            onClick={registration}
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className=' text-sm text-slate-500'>Already have an account? <Link className=' font-bold' to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default RegistrationPage;
