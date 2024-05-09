import React from "react";
import { HeaderIcon } from "./Header1";

const MiddleSection = () =>{
    return <div className="middle-section">
        <div className="train-link zoomIn wow animated">
            {/* <HeaderIcon class="logo" id="local" redirect="/local" /> */}
            <HeaderIcon class="logo" id="express" redirect="express" />
            <HeaderIcon class="logo" id="chat-room" redirect="chat"/>
            <HeaderIcon class="logo" id="news" redirect="news"/>
        </div>
    </div>
};

export default MiddleSection;