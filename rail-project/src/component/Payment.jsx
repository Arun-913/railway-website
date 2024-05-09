import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentComponent({ train, passenger, email, id, receipt}) {
    const navigate = useNavigate();

    useEffect(() => {
        const loadRazorpayScript = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
            script.onload = initializeRazorpay;
        };

        const initializeRazorpay = () => {
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                amount: "100",
                currency: "INR",
                name: "TrackEase",
                description: "Ticket Booking Payment",
                image: "https://example.com/your_logo",
                order_id: id,
                handler: async function (response) {
                    console.log(response);
                    await axios.post('http://localhost:8001/post-ticket', {
                        train: train,
                        passenger: passenger,
                        email: email,   
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id
                    });
                    navigate('/profile');
                },
                prefill: {
                    name: process.env.REACT_APP_NAME,
                    email: process.env.REACT_APP_EMAIL,
                    contact: process.env.REACT_APP_CONTACT
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert("Payment failed");
                console.log(response);
            });

            rzp1.open();
        };

        loadRazorpayScript();
    }, []);

    console.log(passenger);
    
    return null; 
}

export default PaymentComponent;