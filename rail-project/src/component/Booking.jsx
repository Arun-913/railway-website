import React,{useLayoutEffect, useState, useEffect} from "react";
import Header1 from "./Header1";
import '../css/booking-page.css';
import Footer from "./Footer";
import { useDataContex } from "./DataContex";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import PaymentComponent from "./Payment";
import Cookies from 'js-cookie';

const BookingTrain = () =>{
    const {trainDetails} = useDataContex();
    const user = Cookies.get('user');
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

    return <div className="booking-train">
        <div className="booking-train-name">{trainDetails.trainName} ({trainDetails.trainNo})</div>
        <div className="booking-train-details">
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
                <div className="">Sun, 25 Feb</div>
            </div>
        </div>
    </div>
}

const PassengerRow = ({ onRemove, onChange }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [berth, setBerth] = useState('');

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
    };

    const handleChange = () => {
        if (onChange) {
            onChange({ name, age, gender, berth });
        }
    };

    return (
        <div className="booking-passenger-row">
            <input 
                type="text" 
                placeholder="Passenger Name"
                className="booking-passenger-name" 
                value={name}
                onChange={e => {
                    setName(e.target.value);
                    handleChange();
                }}
            />
            <input 
                type="number" 
                placeholder="Age"
                className="booking-passenger-age" 
                value={age}
                onChange={e => {
                    setAge(e.target.value);
                    handleChange();
                }}
            />
            <select 
                className="booking-passenger-gender"
                value={gender}
                onChange={e => {
                    setGender(e.target.value);
                    handleChange();
                }}
            >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <select 
                className="booking-passenger-berth"
                value={berth}
                onChange={e => {
                    setBerth(e.target.value);
                    handleChange();
                }}
            >
                <option value="">No Preference</option>
                <option value="Lower">Lower</option>
                <option value="Middle">Middle</option>
                <option value="Upper">Upper</option>
                <option value="Side Lower">Side Lower</option>
                <option value="Side Upper">Side Upper</option>
            </select>
            <span className="remove-passenger-count" onClick={handleRemove}>X</span>
        </div>
    );
};

const PassengerDetails = () => {
    const {trainDetails} = useDataContex();
    const email = Cookies.get('email');
    const [passengerRows, setPassengerRows] = useState([<PassengerRow key={0} />]);
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [message, setMessage] = useState('');

    const handleAddPassenger = () => {
        if(passengerRows.length === 6){
            setMessage(`Only upto 6 Passenger is allowed`);
            return;
        }
        setMessage('');
        setPassengerRows(prevRows => [...prevRows, <PassengerRow key={prevRows.length} onRemove={() => handleRemovePassenger(prevRows.length)} />]);
    };

    const handleRemovePassenger = (indexToRemove) => {
        setPassengerRows(prevRows => prevRows.filter((_, index) => index !== indexToRemove));
    };

    const handleChangePassenger = (index, updatedDetails) => {
        setPassengerDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index] = updatedDetails;
            return newDetails;
        });
    };

    const HandleBookTicket = async() =>{
        if(passengerRows.length === 0){
            setMessage('Enter the Passenger details');
            return;
        }
        setMessage('');
        const amount = 1;
        const temp = await axios.post('http://localhost:8001/createOrder', amount);
        setPaymentDetails(temp);
        setShowPayment(true);
        return;
    }
    

    return (
        <>
        <div className="booking-passenger-details">
            <div className="booking-passenger-title">Passenger Details</div>
            {passengerRows.map((row, index) => (
                <PassengerRow 
                    key={index} 
                    onChange={newDetails => handleChangePassenger(index, newDetails)} 
                    onRemove={() => handleRemovePassenger(index)} 
                />
            ))}
            {passengerRows.length < 6 ? <div className="booking-increase-row" onClick={handleAddPassenger}>+ Add Passenger</div> : <></>}
            <div>Ticket details will be sent to your email</div>
            {message !== '' ? <div style={{textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>{message}</div> : <></>}
        </div>
        <div className="booking-book-btn" onClick={HandleBookTicket}>Book</div>
        {showPayment && <PaymentComponent train={trainDetails} passenger={passengerDetails} email={email} id={paymentDetails.id} receipt={paymentDetails.receipt}/>}
        </>
    );
};

const Booking = () =>{
    const navigate = useNavigate();
    const {trainDetails} = useDataContex();
    const user = Cookies.get('user');
    if(user == null){
        navigate('/');
    }
    if(trainDetails == null){
        navigate('/express');
    }

    return <>
        <Header1/>
        <div className="temp"></div>
        <BookingTrain/>
        <PassengerDetails/>
        <Footer/>
    </>
}

export default Booking;