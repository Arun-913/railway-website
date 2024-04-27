import React from "react";
import HolidayPlace from "./HolidayPlace";

const Holiday = () =>{
    const content1 = "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an “Experience Unsurpassed”. It has been a winner of “World’s Leading Luxury train” by World Travel Awards consecutively for last six years.";

    const content2 = "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa charges and overseas medical insurance to give you a hassle-free and memorable experience.";

    const content3 = "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes or Picturesque Islands, IRCTC has it all. Discover India through IRCTC!";

    const content4 = "IRCTC operates Bharat Gaurav Tourist Train having AC III-Tier accommodation on train specially designed to promote domestic tourism in India. This train runs on various theme based circuits covering pilgrimage and heritage destinations in its itinerary on a 5 days to 20 days trip and showcase India’s rich cultural heritage.";

    const content5 = "IRCTC offers Exclusive Rail tour packages with confirmed train tickets, sight-seeing and meals for enchanting Nilgiri Mountains, Darjeeling, Kullu Manali, Kashmir, Gangtok or divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi, Tirupati etc. Holiday packages/ Land packages to these destinations are also available..";

    return  <section id="holiday">
        <h1 className="section-title">HOLIDAYS</h1>
        
        <div className="holiday-places">
            <HolidayPlace class="tour-1" title="Maharajas Express" content={content1} redirect="https://www.the-maharajas.com/"/>
            <HolidayPlace class="tour-2" title="Internation Pacakages" content={content2} redirect="https://www.irctctourism.com/"/>
            <HolidayPlace class="tour-3" title="Domestic Air Packages" content={content3} redirect="https://www.irctctourism.com/"/>
            <HolidayPlace class="tour-4" title="Bharat Gaurav Tourist Train" content={content4} redirect="https://www.irctctourism.com/bharatgaurav"/>
            <HolidayPlace class="tour-5" title="Rail Tour Packages" content={content5} redirect="https://www.irctctourism.com/"/>
        </div>
    </section>
}

export default Holiday;