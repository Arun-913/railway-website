import React, { useEffect, useState } from "react";
import Header1 from "./Header1";
import '../css/news.css';
// import Image from '../news1.jpeg';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Link, useNavigate } from "react-router-dom";

export const fetchNewsFromDB = async() =>{
    const response = await axios.get('http://localhost:8001/get-news');
    return response.data;
}


const NewsContent = ({data}) =>{
    const navigate = useNavigate();

    const handleReadMore = () =>{
        navigate(`/news/${data._id}`);
    }

    return (
        <div className="news-overview">
            <img 
                src={data.image}
                alt="My Image"
                className="news-image"
            /> <br />
            <span role="img" aria-label="calendar">📅 </span>
            <span className="news-date">{data.createdAt.substring(0, 10)}&nbsp; &nbsp;|&nbsp; &nbsp;</span>
            <span role="img" aria-label="comment">💬 </span>
            <span className="news-comment">{data.comments.length} COMMENTS</span>
            <div className="news-heading">{data.title}</div>
            <div className="news-content">{data.content}</div>
            <div 
                className="news-read-more"
                onClick={handleReadMore}
            >Read More <span role="img" aria-label="right arrow">→</span> </div>
        </div>
    );
}

const News = () =>{
    const [news, setNews] = useState([]);

    useEffect(() =>{
        const fetchData = async () => {
            const fetchedNews = await fetchNewsFromDB();
            setNews(fetchedNews);
            console.log(fetchedNews);
        };

        fetchData();
    },[]);

    return <>
        <Header1/>
        <div className="temp"></div>
        <div className="news">
            {news.map((element, index) => {
                return <NewsContent data={element}/>
            })}
        </div>
    </>
}

export default News;