// This is the welcome page of this web application

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const [top, setTop] = useState(100) // value of top when position is relative
  
    // Declaring useNavigation hook. After showing the logo, user will be redirected to the home page
    const navigate = useNavigate();

    // Logo will be arise some seconds later. Thats why this style values are needed to be dynamic
    const style = {
        position : 'relative',
        top: top + 'vh',
        transition: '1s',
    }

    // setting top=0 to arise the logo 
    setTimeout(()=>{
        setTop(0)
    },300)

    // redirecting user to the home page after 1.5 second
    setTimeout(()=>{
        navigate('/home')
    },1500) 

    return (
        <div className=" bg-orange-100 h-screen flex justify-center items-center overflow-hidden">
            <h1 style={style} className=" text-6xl font-bold text-gray-600">MemoTack</h1>
        </div>
    );
};

export default WelcomePage;