import React, {useState, useEffect, useRef} from "react";
import '../css/express.css';
import Header1 from "./Header1";
import Footer from "./Footer";
import axios from 'axios';
import Loader from "./Loader";
import '../css/dropdown.css'
import trainBetweenStation from '../json/trainBetweenStation.json';
import seatAvailability from '../json/seatAvailability.json';

import { useDataContex } from "./DataContex";
import { useAsyncError,Link } from "react-router-dom";

let trainData = [];
let seatData = [];
let date2 = '';
let quota = '';
let bogieName = '';

const getStationCode = async (station) => {
    const options = {
        method: 'POST',
        url: 'https://rstations.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'rstations.p.rapidapi.com'
        },
        data: { search: station }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const GetTrainBetweenStations = async (from, to, date, selectedOption) =>{
    const url = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations?fromStationCode=${from}&toStationCode=${to}&dateOfJourney=${date}`;
    const options = {
        method: 'GET',
        headers: {
            // 'X-RapidAPI-Key': '0328c579e3msh3974a6df802e0fep1c9edcjsn6dac98a91896',
            'X-RapidAPI-Key': REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        trainData = result.data;
        return result.data;
    } catch (error) {
        console.error("Error occurred during fetching the trains");
    }
};

const checkSeatAvailability = async(classType, fromStationCode, quota, toStationCode, trainNo, date) =>{
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/checkSeatAvailability',
        params: {
            classType: classType,
            fromStationCode: fromStationCode,
            quota: quota,
            toStationCode: toStationCode,
            trainNo: trainNo,
            date: date
        },
        headers: {
            'X-RapidAPI-Key': REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        seatData = response.data.data;
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
}

const ExpressSearchForm = () =>{
    const {setVisible} = useDataContex();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [selectedOption, setSelectedOption] = useState('GN');
    const [fromStationCode, setFromStationCode] = useState([]);
    const [toStationCode, setToStationCode] = useState([]);
    const [fetchTimeout, setFetchTimeout] = useState(null);
    const [message, setMessage] = useState('');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [loading, setLoading] = useState(false);
    
    
    const setState = async () =>{
        if(from === '' || to === '' || date === ''){
            if(from === '') setMessage('Enter the Source station');
            else if(to === '') setMessage('Enter the Destinaton station');
            else setMessage('Enter the Journey date');
            return;
        }
        setLoading(true);

        date2 = date;
        quota = selectedOption;
        const temp = await GetTrainBetweenStations(from, to, date, selectedOption);
        // console.log(temp);

        // trainData = trainBetweenStation.data;

        setVisible(true);
        setLoading(false);
    };

    const handleFromStation = async(e) =>{
        const inputValue = e.target.value;
        setFrom(inputValue);

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
        }

        if(e.target.value !== ''){
            const timeoutId = setTimeout(async () => {
                const temp = await getStationCode(inputValue);
                setFromStationCode(temp);
            }, 1000);
            
            setFetchTimeout(timeoutId);
        }
        else setFromStationCode([]);
    }

    const handleToStation = async(e) =>{
        const inputValue = e.target.value;
        setTo(inputValue);

        if (fetchTimeout) {
            clearTimeout(fetchTimeout);
        }

        if(inputValue !== ''){
            const timeoutId = setTimeout(async () => {
                const temp = await getStationCode(inputValue);
                setToStationCode(temp);
            }, 1000);
            
            setFetchTimeout(timeoutId);
        }
        else setToStationCode([]);
    }

    const addFromStation = (stationCode, stationName) =>{
        setFrom(`${stationCode}`);
        setFromStationCode([]);
    }

    const addToStation = (stationCode, stationName) =>{
        setTo(`${stationCode}`);
        setToStationCode([]);
    }

    useEffect(() =>{
        const handleMaxDate = () =>{
            const today = new Date();
    
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
    
            const yyyy = tomorrow.getFullYear();
            let mm = tomorrow.getMonth() + 1; 
            let dd = tomorrow.getDate();
            if (mm < 10) {
                mm = '0' + mm;
            }
            if (dd < 10) {
                dd = '0' + dd;
            }
            const tomorrowDate = yyyy + '-' + mm + '-' + dd;
            setMaxDate(tomorrowDate);
        }
        if(selectedOption === 'TQ' || selectedOption === 'PQ') {
            handleMaxDate();
        }
    },[selectedOption]);

    useEffect(() => {
        const today = new Date();
        
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (mm < 10) {
        mm = '0' + mm;
        }
        if (dd < 10) {
        dd = '0' + dd;
        }
        const currentDate = yyyy + '-' + mm + '-' + dd;

        // Set the minimum date to the current date
        setMinDate(currentDate);
        setDate(currentDate);

        // Calculate the maximum date (e.g., one year back from today)
        const maxDate = new Date(today);
        maxDate.setMonth(maxDate.getMonth() + 4); // Adjust as needed
        const yyyyMax = maxDate.getFullYear();
        let mmMax = maxDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
        let ddMax = maxDate.getDate();
        if (mmMax < 10) {
        mmMax = '0' + mmMax;
        }
        if (ddMax < 10) {
        ddMax = '0' + ddMax;
        }
        const maxDateString = yyyyMax + '-' + mmMax + '-' + ddMax;
        setMaxDate(maxDateString);
    }, []);

    return (
        <form>
            <div className="express-search-header">Travelling Details</div>
            <div className="express-search-input">
                <input type="text" 
                    value={from}  
                    onChange={handleFromStation}
                    placeholder="From"
                />
                <input type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                />
            </div>

            <div className="dropdown-result">
                {fromStationCode && fromStationCode.map((option, index) => (
                    <div className="dropdown-result-child"
                        onClick={() => addFromStation(option[0], option[1])}
                        key={index}
                    >
                        {option[0]} - {option[1]}
                    </div>
                ))}
            </div>

            <div id="express-arrow-1">&#8645;</div>
            <div className="express-search-input">
                <input type="text" 
                    value={to}
                    onChange={handleToStation}
                    placeholder="To" 
                />
                <select 
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}
                >
                    <option value="GN">GENERAL</option>
                    <option value="TQ">TATKAL</option>
                    <option value="PT">PREMIUM TATKAL</option>
                    <option value="SS">LOWER BERTH/SR.CITIZEN</option>
                    <option value="LD">LADIES</option>
                    <option value="HP">PERSON WITH DISABILITY</option>
                </select>
            </div>
            {message !== '' ? <div style={{textAlign:'center'}}>{message}</div> : <></>}

            <div className="dropdown-result">
                {toStationCode && toStationCode.map((option, index) => (
                    <div 
                        className="dropdown-result-child"
                        onClick={() => addToStation(option[0], option[1])}
                        key={index}
                    >
                        {option[0]} - {option[1]}
                    </div>
                ))}
            </div>

            <div className="btn" onClick={setState}>Search Train</div>
            {loading && <Loader/>}
        </form>
    );
}


const DisplaySeatAvailability = (props) =>{
    const [buttonVisible, setButtonVisible] = useState(false);
    const [price, setPrice] = useState('');

    const [selectedClassIndex, setSelectedClassIndex] = useState(null);
    const {trainDetails, setTrainDetails} = useDataContex();

    const style = {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    };

    return <>
        <div className="express-seat"
            onClick={() =>{
                setButtonVisible(true);
            }}
        >
            {seatData.map((seat, index) =>{
                return (
                    <div 
                        className={`${selectedClassIndex === index ? 'express-selected' : ''}`}
                        onClick={async() =>{
                            const newObject = {
                                date : seat.date,
                                currentStatus: seat.current_status,
                                price: seat.total_fare
                            };
                            await setTrainDetails(prevState =>{
                                return {
                                    ...prevState,
                                    ...newObject
                                }
                            });
                            // console.log(trainDetails);
                            setPrice(seat.total_fare);
                            setSelectedClassIndex(index);
                        }}
                    >
                        <div className="express-seat-date">{seat.date}</div>
                        <div className="express-seat-status">{seat.current_status}</div>
                    </div> 
                );
            })}
        </div>
        {buttonVisible && 
        <div style={style}>
            <Link to='/booking' className="express-train-btn">Book Now</Link>
            <div>&#8377; {price}</div>
        </div>
        }
    </>
}

const DisplayTrains = (props)=>{
    const [seatVisible, setSeatVisible] = useState(false);
    const [selectedClassIndex, setSelectedClassIndex] = useState(null);
    const {trainDetails, setTrainDetails} = useDataContex();
    const [loading, setLoading] = useState(false);

    const handelClickForSeats = async(from, to, trainNo, classes, index, trainName) =>{
        // console.log(bogieName.length);
        // console.log(from, to, trainNo, quota, classes, date2);
        setLoading(true);
        
        // seatData = seatAvailability.data;
        const result = await checkSeatAvailability(classes, from, quota, to, trainNo, date2);
        seatData = result;
        
        setSeatVisible(true);
        setLoading(false);

        setSelectedClassIndex(index);
        setTrainDetails({
            trainNo : trainNo,
            trainName: trainName,
            from: from,
            to: to,
            quota: quota,
            classes: classes,
            fromTime: props.fromTime,
            toTime: props.toTime,
            duration: props.duration,
            distance: props.distance,
        });
    }

    return (
        <div className="express-train">
            <div className="express-train-header">
                <div className="express-train-name">{props.trainName} ({props.trainNumber})</div>
                <div className="express-train-freq">
                    {props.runDays && props.runDays.map((day,index) =>{
                        return <span className="express-train-day" key={index}>{day}</span>
                    })}
                </div>
                <div className="express-train-stopage">Train Schedule</div>
            </div>
            <div className="express-train-schedule">
                <div className="express-train-schedule-1">
                    <div>{props.fromTime}</div>
                    <div>{props.src}</div>
                </div>
                <div className="express-train-schedule-2">
                    <div>{props.duration}</div>
                </div>
                <div className="express-train-schedule-3">
                    <div>{props.toTime}</div>
                    <div>&nbsp; &nbsp;{props.dst}</div>
                </div>
            </div>
            <div className="express-train-class">
                {props.classType && props.classType.map((classes, index) =>{
                    return (
                        <div 
                            className={`express-train-class-${index} ${selectedClassIndex === index ? 'express-selected' : ''}`}
                            onClick={() => handelClickForSeats(props.fromStationCode, props.toStationCode, props.trainNumber, classes, index, props.trainName, props.duration, props.distance)}
                        >
                            {classes}
                        </div>
                    );
                })}
            </div>
            {seatVisible && 
            <DisplaySeatAvailability 
                from={props.fromStationCode}
                to={props.toStationCode}
                trainNo={props.trainNumber}
            />}
            {loading && <Loader/>}
        </div>
    );
}

const Express = () =>{
    const {visible, setVisible} = useDataContex();

    return(
        <>
            <Header1/>
            <div className="express-search">
                <div className="express-search-child">
                    <ExpressSearchForm/>
                </div>
            </div>
            {visible ? 
            <div className="express-search-result">
                <div>
                    {trainData.map((train, index) =>{
                        return <DisplayTrains key={index} 
                            trainName={train.train_name} trainNumber={train.train_number}
                            classType={train.class_type} duration={train.duration}
                            fromTime={train.from_std} toTime={train.to_sta}
                            src={train.from_station_name} dst={train.to_station_name}
                            runDays={train.run_days}
                            fromStationCode={train.from} toStationCode={train.to}
                            distance={train.distance}/>
                    })}
                </div>
            </div> : <></>}
            
            <Footer/>
        </>
    )
}

export default Express;