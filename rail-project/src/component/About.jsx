import React from "react";

const About = () =>{
    const Style = {
        margin: '60px 20px 20px 20px',
    };

    return <section id="about-us">
        <h1 className="section-title">ABOUT US</h1>

        <div className="about-us-section">
            <div className="about-us-div about-us-div-1">
                <h2 className="section-subtitle" style={Style}>Welcome to Indian Railway</h2>
                <p className="paragraph">Indian Railways is the backbone of the country's logistics sector. It carry more
                    than 1.2 Billon tonnes of freight traffic every year over a network of 68000
                    kms. With our network touching almost every nook and corner of the country, therefore its
                    play a crucial role in facilitating a balanced and inclusive socio economic
                    development of the country. Indian Railways carry almost all commodities including bulk
                    commodities like Coal, Iron ore, Iron & Steel, Food grains, Cement, Petroleum
                    products, Fertilizer and other commodities carried in containers with environment friendly mode of
                    land transportation.</p>
            </div>
            <div className="about-us-div about-us-div-2"></div>
        </div>
    </section>;
};

export default About;