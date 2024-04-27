import React from "react";

const HolidayPlace = (props) =>{
    const defaultClass = "tour-img";

    return <div className="holiday-tour">
        <div className={`${defaultClass} ${props.class}`}></div>
        <h2 className="section-subtitle holiday-title">{props.title}</h2>
        <p className="paragraph">{props.content}</p>
        <a href={props.redirect} className="hyperlink">&nbsp;&nbsp;Read More</a>
    </div>
};

export default HolidayPlace;