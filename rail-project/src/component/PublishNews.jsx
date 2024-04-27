import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header1 from "./Header1";
import '../css/publish-news.css';

const PublishNews = () => {
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState('');

    const converToBase64 = async(e) =>{
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () =>{
            setImage(reader.result);
            console.log(reader.result);
        };
        reader.onerror = error =>{
            console.log("error : ", error);
        };
    }

    const uploadData = async () => {
        try {
            const response = await axios.post('http://localhost:8001/post-news', {
                title: title,
                image: image,
                content: content,
            });
            console.log('Photo uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <Header1/>
            <div className="temp"></div>
            <div className="publish-news">
                <input 
                    type="text"
                    className='publish-news-heading' 
                    placeholder='Enter the title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea cols="30" rows="10"
                    className='publish-news-content'
                    placeholder='Enter news'
                    value={content}
                    onChange={e => setContent(e.target.value)}
                ></textarea>
                
                <input 
                    type="file" 
                    accept='image/*'
                    onChange={converToBase64}
                    className='publish-news-image'
                />
                {image && (
                    <img 
                        src={image} 
                        alt="Preview"
                        className='publish-news-preview'
                        style={{ maxWidth: '100%', maxHeight: '200px' }} 
                    />
                )}
                <button 
                    onClick={uploadData}
                    className='publish-news-upload'>
                        Publish News
                </button>
            </div>
        </>
    );
};

export default PublishNews;
