import React, {useState} from "react";
import Header1 from "./Header1";
import '../css/local.css';
import {routes} from '../javascript/localTrain.js';


const HandleOnClick = (props) => {
    return (
        <div className={`local-station-${props.station} local-station-route`}>
            {props.route.map((element, index) =>{
                    return <div>To =&gt; {element[0].toUpperCase() + element.slice(1)}</div>
                })}
        </div>
    );
};

const ShowAllStations = () => {
    // const stations = ["airoli", "ambernath", "ambivli", "andheri", "asangaon", "atgaon", "badlapur", "bandra", "belapur-cbd"];
    const stations = ["airoli", "ambernath", "ambivli", "andheri", "asangaon", "atgaon", "badlapur", "bandra", "belapur-cbd", "bhandup", "bhayander", "bhivpuri-road", "boisar", "borivali", "byculla", "csmt", "charni-road", "chembur", "chinchpokli", "chunabhatti", "churchgate", "cotton-green", "currey-road", "dadar", "dahanu-road", "dahisar", "diva-jn", "dockyard-road", "dolavli", "dombivli", "gtb-nagar", "ghansoli", "ghatkopar", "goregaon", "govandi", "grant-road", "jogeshwari", "juinagar", "kalva", "kalyan", "kandivali", "kanjur-marg", "karjat", "kasara", "kelavli", "kelva-road", "khadavli", "khandeshwar", "khar-road", "khardi", "kharghar", "khopoli", "kings-circle", "kopar", "koparkhairne", "kurla", "lower-parel", "lowjee", "mahalakshmi", "mahim-jn", "malad", "manasarovar", "mankhurd", "marine-lines", "masjid", "matunga", "matunga-road", "mira-road", "mulund", "mumbai-central", "mumbra", "nahur", "naigaon", "nalla-sopara", "nerul", "umbermali", "palasdhari", "palghar", "panvel", "parel", "prabhadevi", "rabale", "ram-mandir", "reay-road", "sandhurst-road", "sanpada", "santa-cruz", "saphale", "seawood-darave", "sewri", "shahad", "shelu", "sion", "thakurli", "thane", "thansit", "tilaknagar", "titwala", "turbhe", "ulhas-nagar", "umroli-road", "vadala-road", "vaitarana", "vangani", "vangaon", "vasai-road", "vashi", "vasind", "vidyavihar", "vikhroli", "vile-parle", "virar", "vithalwadi"];

    const [selectedStation, setSelectedStation] = useState(null);

    const handleOnClick = (station) => {
        setSelectedStation(station);
    };

    return (
        <>
            {stations.map((station, index) => (
                <>
                    <div 
                        key={index} 
                        className="local-station"
                        onClick={() => handleOnClick(station)}
                    >
                        {station[0].toUpperCase() + station.slice(1)}
                    </div>
                    {selectedStation === station && <HandleOnClick station={station} route={routes[station]} />}
                </>
            ))}
        </>
    );
};

// const ShowAllStations = () => {
//     const stations = ["airoli", "ambernath", "ambivli", "andheri", "asangaon", "atgaon", "badlapur", "bandra", "belapur-cbd"];
//     const [selectedStation, setSelectedStation] = useState(null);

//     const handleOnClick = (station) => {
//         setSelectedStation(station === selectedStation ? null : station);
//     }

//     return (
//         <>
//             {stations.map((station, index) => (
//                 <div 
//                     key={index} 
//                     className={`local-station ${station === selectedStation ? 'selected' : ''}`}
//                     onClick={() => handleOnClick(station)}
//                 >
//                     {station[0].toUpperCase() + station.slice(1)}
//                     {station === selectedStation && (
//                         <div className={`local-station-route ${station === selectedStation ? 'active' : ''}`}>
//                             <div>To =&gt; Thane</div>
//                             <div>To =&gt; Vashi/Nerul/Thane</div>
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </>
//     );
// }


const Local = () =>{
    return <>
        <Header1/>
        <div className="temp"></div>
        <div className="local-input-field">
            <input type="text" 
                placeholder="Source"
                className="local-input-field-source"/>
            <input type="text" 
                placeholder="Destination"
                className="local-input-field-destination"
            />
            <button className="local-search-btn">Search Train</button>
        </div>
        <ShowAllStations/>

    </>
}

export default Local;