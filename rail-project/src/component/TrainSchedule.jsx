import React, { useState } from "react";
import Header1 from "./Header1";
import '../css/train-schedule.css';
import axios from "axios";
import trainschedule from '../json/trainschedule.json';
import Loader from "./Loader";

const fetchTrainSchedule = async(trainNo) =>{
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
        params: {trainNo: trainNo},
        headers: {
            'X-RapidAPI-Key': REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const TrainScheduleResult = ({trainDetails}) =>{
    const length = trainDetails.route.length;
    const days = [
        {key: "Sun", value: trainDetails.runDays.sun},
        {key: "Mon", value: trainDetails.runDays.sun},
        {key: "Tue", value: trainDetails.runDays.sun},
        {key: "Wed", value: trainDetails.runDays.sun},
        {key: "Thu", value: trainDetails.runDays.sun},
        {key: "Fri", value: trainDetails.runDays.sun},
        {key: "Sat", value: trainDetails.runDays.sun}
    ];
    let stop = 0;

    return <>
        <div className="" style={{display:'flex', justifyContent:'start', margin:'15px auto', width:'90vw'}}>
            <div>
                <div className="train-schedule-header" style={{width:'12vw'}}>Train Number</div>
                <div className="train-schedule-header-child">{trainDetails.trainNumber}</div>
            </div>
            <div>
                <div className="train-schedule-header" style={{width:'17vw'}}>Train Name</div>
                <div className="train-schedule-header-child">{trainDetails.trainName}</div>
            </div>
            <div>
                <div className="train-schedule-header" style={{width:'17vw'}}>From Stations</div>
                <div className="train-schedule-header-child">{trainDetails.route[0].station_name}</div>
            </div>
            <div>
                <div className="train-schedule-header" style={{width:'17vw'}}>Destination Station</div>
                <div className="train-schedule-header-child">{trainDetails.route[length-1].station_name}</div>
            </div>
            <div>
                <div className="train-schedule-header" style={{width:'27vw'}}>Runs On</div>
                <div className="train-schedule-header-child">
                    {days.map(day =>{
                        if(day.value) return <span>{day.key} </span>
                    })}
                </div>
            </div>
        </div>

        <div className="train-schedule-station">
            <div style={{width:'5vw'}}>S.N.</div>
            <div style={{width:'10vw'}}>Station Code</div>
            <div style={{width:'15vw'}}>Station Name</div>
            <div style={{width:'10vw'}}>Arrival Time</div>
            <div style={{width:'12vw'}}>Departure Time</div>
            <div style={{width:'15vw'}}>Halt Time(in minutes)</div>
            <div style={{width:'10vw'}}>Distance</div>
            <div style={{width:'5vw'}}>Day</div>
        </div>

        {trainDetails.route.map((element, index) =>{
            if(element.stop){
                stop++;
                return <>
                <div className="train-schedule-station" style={{backgroundColor:'white', color:'black'}}>
                    <div style={{width:'5vw'}}>{stop}</div>
                    <div style={{width:'10vw'}}>{element.station_code}</div>
                    <div style={{width:'15vw'}}>{element.station_name}</div>
                    <div style={{ width: '10vw' }}>
                        {index === 0 ? '-' : `${Math.floor(element.sta / 60) % 24}:${element.sta % 60}`}
                    </div>
                    <div style={{width:'12vw'}}>
                        {index === length-1 ? '-' : `${Math.floor(element.std_min / 60) % 24}:${element.std_min % 60}`}
                    </div>
                    <div style={{width:'15vw'}}>{index === 0 || index === length-1 ? '-' : `${element.std_min - element.sta}`}</div>
                    <div style={{width:'10vw'}}>{Number(element.distance_from_source)}</div>
                    <div style={{width:'5vw'}}>{index === length-1 ? `${element.day}` : `${element.d_day}`}</div>
                </div><hr style={{width:'90vw', margin:'auto'}}/>
                </>
            }
        })}
    </>
}

const TrainSchedule = () =>{
    const [trainNo, setTrainNo] = useState('');
    const [message, setMessage] = useState('');
    const [trainDetails, setTrainDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async() =>{
        if(trainNo.length != 5){
            setMessage('Train digit should be 5');
            return;
        }
        setLoading(true);

        const temp = await fetchTrainSchedule(trainNo);
        if(temp.status == false){
            setMessage('Train Number is Invalid');
            return;
        }
        setTrainDetails(temp);

        // setTrainDetails(trainschedule);
        setLoading(false);
        setMessage('');
    }

    return <>
        <Header1/>
        <div className="temp"></div>
        <div className="pnr-input">
            <input 
                type="number"
                placeholder="Enter Train Number"
                value={trainNo}
                onChange={e => setTrainNo(e.target.value)}
            />
            <div 
                className="pnr-btn"
                onClick={handleClick}
            >Search</div>
            <div className='pnr-input-message'>{message}</div>
        </div>
        {loading && <Loader/>}
        {!loading && trainDetails && <TrainScheduleResult trainDetails={trainDetails.data}/>}
    </>
}

export default TrainSchedule;