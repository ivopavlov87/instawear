import React from "react";
import { Fade } from 'react-slideshow-image';
import SignupFormContainer from "../session_form/signup_form_container";

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    // onChange: (oldIndex, newIndex) => {
    //     console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    // }
}

const Splash = () => {
    return (
        <div className="splash-page">
            <div className="splash-animation">
                {/* <div className="fade-div-wrapper" style={{ backgroundImage: '/images/splash-phone.png' }}> */}
                <div className="fade-background">
                    {/* <img src="/images/splash-phone.png" alt="" className="phone-background"/> */}
                    <div className="fade-div-wrapper">
                        <Fade {...fadeProperties}>
                            <div className="each-fade">
                                <div className="image-container">
                                    <img src="/images/splash-1.jpg" alt="" className="cover" id="delay-1" />
                                </div>
                            </div>
                            <div className="each-fade">
                                <div className="image-container">
                                    <img src="/images/splash-2.jpg" />
                                </div>
                            </div>
                            <div className="each-fade">
                                <div className="image-container">
                                    <img src="/images/splash-3.jpg" />
                                </div>
                            </div>
                            <div className="each-fade">
                                <div className="image-container">
                                    <img src="/images/splash-4.jpg" />
                                </div>
                            </div>
                        </Fade>
                        {/* {document.getElementsByClassName("indicators").style={display: 'none'}} */}
                        {/* {ReactDOM.findDOMNode(<Splash>).getElementsByClassName('indicators')} */}
                        {/* {React.Children.toArray(this.props.children).filter((item) => item.props.className === 'indicators').length} */}
                    </div>
                </div>         
                <SignupFormContainer />
            </div>
            <footer className="about-links">
                <a href="https://anoushsaroyan.com">ABOUT ME</a>
                <a href="https://github.com/AnoushSaroyan">GITHUB</a>
                <a href="https://www.linkedin.com/in/anoushsaroyan/">LINKEDIN</a>
            </footer> 
        </div>
        
    );

};

export default Splash;
