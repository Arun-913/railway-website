import React from "react";
// import ServiceType from "./ServiceType";
import { useNavigate } from "react-router-dom";

const ServiceType = (props) =>{
    const navigate = useNavigate();

    return <div className="service-type" onClick={() => navigate(props.redirect)}>
        <div className={`${"service-img"} ${props.class}`}></div>
        <div className="service-content">
            <h4 className="section-subtitle">{props.title}</h4>
            <p className="paragraph">{props.content}</p>
        </div>
    </div>
};

const Service = () =>{
    return <section id="services">
        <h1 className="section-title">Services</h1>

        <div className="services-provide">
            <ServiceType class="service-1" title="Book Ticket" content="Book Ticket from(Source) &rarr; to(Destination)" redirect='/express'/>
            <ServiceType class="service-2" title="Mumbai Local" content="Mumbai Local train schedule of western, centrak, harbour & trans-harbour" redirect={'/local'}/>
            <ServiceType class="service-3" title="PNR Status" content="PNR status of reservation ticket" redirect={'/pnr'}/>
            <ServiceType class="service-4" title="Train Schedule" content="All Express train origin station and timing by train number" redirect={'/train-schedule'}/>
            <ServiceType class="service-5" title="Track Train" content="Track the current status of express train"/>
            <ServiceType class="service-6" title="Chart Vacancy" content="Vacant Seat of express train whose chart is prepared"/>
        </div>
    </section>
}

export default Service;