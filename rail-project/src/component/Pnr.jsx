import React, { useState } from "react";
import axios from 'axios';
import Header1 from './Header1';
import '../css/pnr.css'
import Loader from './Loader';
import pnrStatus from '../json/pnr.json';

const fetchPnrStatus = async(pnr) =>{
    const options = {
        method: 'GET',
        url: `https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/${pnr}`,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
        // console.log(response);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const PnrResultLeft = ({pnrDetails, pnr}) =>{
    return <div className="pnr-result-left">
        <div className="pnr-element">
            <span className="pnr-left-element">PNR Number</span>
            <span className="pnr-right-element">{pnr}</span>
        </div> <hr/>
        <div className="pnr-element">
            <span className="pnr-left-element">Train Number</span>
            <span className="pnr-right-element">{pnrDetails.trainInfo.trainNo}</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">From Station</span>
            <span className="pnr-right-element">{pnrDetails.trainInfo.boarding}</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">Boarding point</span>
            <span className="pnr-right-element">{pnrDetails.boardingInfo.stationName} ({pnrDetails.boardingInfo.stationCode})</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">Class</span>
            <span className="pnr-right-element">AC 3 tier</span>
        </div><hr />
    </div>
}

const PnrResultRight = ({pnrDetails}) =>{
    return <div className="pnr-result-right">
        <div className="pnr-element">
            <span className="pnr-left-element">Date of Journey</span>
            <span className="pnr-right-element">{pnrDetails.trainInfo.dt}</span>
        </div> <hr/>
        <div className="pnr-element">
            <span className="pnr-left-element">Train Name</span>
            <span className="pnr-right-element">{pnrDetails.trainInfo.name}</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">To Stations</span>
            <span className="pnr-right-element">{pnrDetails.trainInfo.destination}</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">Reservation upto</span>
            <span className="pnr-right-element">{pnrDetails.destinationInfo.stationName} ({pnrDetails.destinationInfo.stationCode})</span>
        </div><hr />
        <div className="pnr-element">
            <span className="pnr-left-element">No. of passengers</span>
            <span className="pnr-right-element">{pnrDetails.passengerInfo.length}</span>
        </div><hr />
    </div>
}

const PnrResult = ({pnrDetails, pnr}) =>{
    return <div className="pnr-result">
        <div className="pnr-result-header">PNR Status Detail</div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',}}>
                <PnrResultLeft pnrDetails={pnrDetails} pnr={pnr}/>
                <PnrResultRight pnrDetails={pnrDetails}/>
        </div>
        <div className="pnr-result-header">Status Report</div>
        <div style={{display:'flex', justifyContent:'center',}}>
            <span className="pnr-left-element">Passenger No.</span>
            <span className="pnr-left-element">Current Status</span>
        </div>
        {pnrDetails.passengerInfo.map((passenger, index) =>{
            return <div style={{display:'flex', justifyContent:'center',}}>
                <span className="pnr-left-element" style={{textAlign:'start'}}>{index+1}</span>
                <span className="pnr-right-element" style={{margin:'3px 10px'}}>{passenger.currentCoach}/{passenger.currentBerthNo}</span>
            </div>
        })}
    </div>
}

const Pnr = () =>{
    const [pnr, setPnr] = useState('');
    const [pnrDetails, setPnrDetails] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePnr = async() =>{
        if(pnr.length != 10){
            setMessage('PNR should be 10 digit');
            setPnrDetails(null);
            return;
        }
        setLoading(true);
        // setPnrDetails(pnrStatus);
        
        const response = await fetchPnrStatus(pnr);
        if(response.status == 'false'){
            setMessage('PNR information not found');
            return;
        }
        // console.log(response);
        setPnrDetails(response);
        setMessage('');
        setLoading(false);
    }

    return <>
        <Header1/>
        <div className="temp"></div>
        <div className="pnr-input">
            <input 
                type="number"
                placeholder="Enter PNR number"
                value={pnr}
                onChange={e => setPnr(e.target.value)}
            />
            <div 
                className="pnr-btn"
                onClick={handlePnr}
            >Get Status</div>
            <div className='pnr-input-message'>{message}</div>
        </div>
        {loading && <Loader/>}
        {!loading && pnrDetails && <PnrResult pnrDetails={pnrDetails.data} pnr={pnr}/>}
    </>
};

export default Pnr;