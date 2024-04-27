const news = require('../models/news.js');


const handleGetNews = async(req, res) =>{
    const response = await news.find();
    // console.log(response.length);
    return res.json(response);
}

const handlePostNews = async(req, res) =>{
    const data = req.body;
    // console.log(data);
    await news.create({
        title: data.title,
        image: data.image,
        content: data.content
    });
    return res.json({msg : "success"});
}

const handleGetNewsById = async(req, res) =>{
    const id = req.params['id'];
    // console.log(id);
    const result = await news.findById(id);
    return res.json(result);
}

const handlePostComment = async(req, res) =>{
    const data = req.body;
    // console.log(data);
    await news.updateOne({_id: data.id},{
        $push : {comments : {
            email : data.email,
            name : data.name,
            comment : data.comment
        }}
    });
    return res.json({msg : 'success'});
}

module.exports = {handleGetNews, handlePostNews, handleGetNewsById, handlePostComment};