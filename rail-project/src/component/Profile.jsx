import React, { useEffect, useState } from "react";
import Header1 from "./Header1";
import '../css/profile.css';
import axios from 'axios';
import { Buffer } from 'buffer';
import {useDataContex} from './DataContex'
import { useNavigate } from "react-router-dom";

const BookingTrain = ({ticket}) =>{
    const trainDetails = ticket.trainDetails;
    const blob = new Blob([Buffer.from(ticket.data)], { type: ticket.contentType });
    const url = window.URL.createObjectURL(blob);

    const mapOfClasses = {
        'SL': 'Sleeper',
        '2S': 'Second Sitting',
        '3A': 'Third AC',
        '2A': "Second AC",
        '1A': 'First AC'
    };

    const mapOfQuota = {
        'GN': "General",
        'TQ': 'Tatkal',
        'PT': "Premium Tatkal",
        'SS': 'LOWER BERTH/SR.CITIZEN',
        'LD': 'Ladies',
        'HP': 'PERSON WITH DISABILITY'
    }

    return <div className="profile-train">
        <div className="profile-train-name">{trainDetails.trainName} ({trainDetails.trainNo})</div>
        <div className="profile-train-details">
            <div>
                <div className="">{trainDetails.fromTime} | {trainDetails.from}</div>
                <div className="">{trainDetails.date}</div>
            </div>
            <div>
                <div className="">{trainDetails.duration}</div>
                <div className="">{mapOfClasses[trainDetails.classes]} ({trainDetails.classes}) | {mapOfQuota[trainDetails.quota]}</div>
            </div>
            <div>
                <div className="">{trainDetails.toTime} | {trainDetails.to}</div>
                <div className="">{trainDetails.date}</div>
            </div>
        </div>
        <a 
            target="blank" 
            href={url} 
            className="profile-download"
            download={`${ticket.fileName}.pdf`}>
                Download
        </a>
    </div>
}

const Profile = () =>{
    const {user} = useDataContex();
    const navigate = useNavigate();
    if(user == null){
        navigate('/authentication');
    }
    const [tickets, setTickets] = useState(null);

    useEffect(() =>{
        const fetchProfileData = async() =>{
            const response = await axios.get(`http://localhost:8001/get/profile?email=${user.email}`);
            // console.log(response.data);
            setTickets(response.data);
        }

        fetchProfileData();
    }, []);

    return <>
        <Header1/>
        <div className="temp"></div>
        <div className="profile-header">Arun Choudhary</div>
        {/* {tickets && <BookingTrain ticket={tickets[0]}/>} */}
        {tickets && tickets.map((element, index) =>{
            return <BookingTrain ticket={element} />
        })};
    </>
}

export default Profile;