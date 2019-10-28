import React from "react";
import SignupFormContainer from "../session_form/signup_form_container";

const Splash = () => {
    return (
        <div>
            <div className="splash-page">
                <div className="splash-animation">
                    <div className="splash-animation-imgs">
                        <img src="/images/splash-phone.png" alt="" id="finish" />
                        {/* <img src="/images/splash-1.jpg" alt="" className="cover" id="delay-1"/> */}
                        <img src="/images/splash-2.jpg" alt="" className="cover" id="delay-2"/>
                        <img src="/images/splash-3.jpg" alt="" className="cover" id="delay-3"/>
                        <img src="/images/splash-4.jpg" alt="" className="cover" id="delay-4" />
                    </div>
                    <SignupFormContainer />
                </div>
                <footer className="about-links">
                    <a href="https://anoushsaroyan.com">ABOUT ME</a>
                    <a href="https://github.com/AnoushSaroyan">GITHUB</a>
                    <a href="https://www.linkedin.com/in/anoushsaroyan/">LINKEDIN</a>
                </footer> 
            </div>
        </div>
        
    );

};

export default Splash;
