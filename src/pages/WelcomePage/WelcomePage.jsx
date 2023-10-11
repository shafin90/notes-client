// This is the welcome page of this web application

import { useState } from "react";

const WelcomePage = () => {
    const [top, setTop] = useState(100) // value of top when position is relative

    const style = {
        position : 'relative',
        top: top + 'vh',
        transition: '1s'
    }

    setTimeout(()=>{
        setTop(0)
    },300)

    return (
        <div className=" bg-amber-50 w-screen h-screen flex justify-center items-center overflow-hidden">
            <h1 style={style} className=" text-6xl font-bold text-gray-600">Short Notes</h1>
        </div>
    );
};

export default WelcomePage;