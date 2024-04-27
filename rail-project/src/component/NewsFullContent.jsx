import React, { useEffect, useState } from "react";
import Header1 from "./Header1";
import { useParams } from "react-router-dom";
import { fetchNewsFromDB } from "./News";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SendLogo from '../image/send-logo.jpg';
import { useDataContex } from "./DataContex";
import Loader from "./Loader";
import Cookies from 'js-cookie';

const ShowExtraContent = ({data}) =>{
    const navigate = useNavigate();

    return <div className="news-all-content-extra">
        <img src={data.image} alt="Image"  className="news-all-content-extra-image"/>
        <div 
            className="news-all-content-extra-heading"
            onClick={() => navigate(`/news/${data._id}`)}>{data.title}</div>
    </div>
}

const NewsFullContent = () =>{
    const {id} = useParams();
    const [news, setNews] = useState(null);
    const [data, setData] = useState(null);
    const [comment, setComment] = useState('');
    const {user} = useDataContex();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const email = user !== null ? user.email : Cookies.get('email');

    const addUserName = () =>{
        if(user != null && user.displayName != null)
            setName(user.displayName);
        else if(user != null && user.username != null)
            setName(user.username);
        else setName('Unknown User');
    }

    const handleInsertComment = async() =>{
        if(comment === '' || user === null){
            if(comment === '') setMessage('Enter the comment');
            else setMessage('Please Login to comment');
            return;
        }
        setLoading(true);
        await axios.post('http://localhost:8001/post-comment', {
            id: id,
            email: email,
            name: name,
            comment: comment
        });
        setLoading(false);
    };

    useEffect(() =>{
        const fetchDataById = async() =>{
            const response = await axios.get(`http://localhost:8001/get-news/${id}`);
            setNews(response.data);
        }

        const fetchNews = async() =>{
            const response = await fetchNewsFromDB();
            setData(response);
        }
        
        addUserName();
        fetchNews();
        fetchDataById();
    },[id]);

    return (<>
        <Header1/>
        <div className="temp"></div>
        <div className="news-all-content">
            {news && <>
                <img src={news.image} alt="Image" className="news-all-content-image" />
                <div className="news-all-content-heading">{news.title}</div>
                <div className="news-all-content-contents">{news.content}</div>
            </>}

            <div className="news-all-content-comment">Comments</div>
            <input 
                type="text"
                className="news-comment-input-field"
                placeholder="Enter comments"
                value={comment}
                onChange={e => {
                    setComment(e.target.value);
                    setMessage('');
                }}
            />
            <span 
                className="news-comment-send-btn"
                onClick={handleInsertComment}>
                    Comment
            </span>
            
            {message !== '' ? <div style={{textAlign:'center', fontSize:'20px', fontWeight:'bold'}}>{message}</div> : <></>}

            {news && news.comments.map((element, index) =>{
                return <div className="news-all-content-comments">
                    <div className="news-all-content-comments-email">{element.name} | {element.email}</div>
                    <div className="news-all-content-comments-comment">{element.comment}</div>
                </div>
            })}
        </div>

        {/* <div style={{marginTop:'100vh', float:'right'}}></div> */}
        {data && data.map((element, index) =>{
            if(element._id != id)
                return <ShowExtraContent data={element}/>
        })}
        {loading && <Loader/>}
        </>
    );
}

export default NewsFullContent;