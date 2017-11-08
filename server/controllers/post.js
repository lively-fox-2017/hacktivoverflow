var Post = require('../models/post')
var Answer = require('../models/answer')
var jwt = require('jsonwebtoken')


class post{
    static get(req,res) {
        Post.find({})
        .populate('postCreator', 'username')
        .then((result,err) => {
            if(err) return res.send(err)

            console.log(result)
            res.send(result)
        })
    }

    static post(req,res) {
        console.log(req.body)
        var opentoken = jwt.verify(req.body.token, 'hacktivoverflow')
        // res.send(opentoken)
        var newPost = new Post({
            postCreator : opentoken.id,
            title: req.body.title,
            content: req.body.content,
            answers: 0,
            views: 0
        })
        // res.send(newPost)
        newPost.save()
        .then((result, err) => {
            if(err) return res.send(err)
            
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static put(req,res) {
        console.log(req.params.id)
        console.log(req.body)
        Post.findOneAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            photo: req.body.photo
        })
        .then((result, err) => {
            if(err) return res.send(err)

            res.send(result)
        })
    }

    static del(req,res) {
        Post.findOneAndRemove({_id: req.params.id})
        .then((result,err) => {
            if(err) return res.send(err)
            console.log(result)
            res.send(result)
        })
        // res.send(req.body)
    }

    static detail(req,res) {
        Post.findOne({_id: req.params.id})
        .populate('postCreator', 'username')
        .then((article,err) => {
            if(err) return res.send(err)

            res.send(article)
        })
    }

    static getAnswer(req,res) {
        Answer.find({Post: req.params.id})
        .populate('answerCreator', 'username')
        .then((data,err) => {
            if(err) return res.send(err) 

            res.send(data)
        })
    }

    static postAnswer(req,res) {
        var opentoken = jwt.verify(req.body.token, 'hacktivoverflow')        
        var newAnswer = new Answer({
            answerCreator : opentoken.id,
            Post : req.params.id,    
            content: req.body.content,
            votes: 0
        })

        newAnswer.save()
        .then((result,err) => {
            if(err) return res.send(err)

            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delAnswer(req,res) {
        Answer.findOneAndRemove({_id: req.params.id})
        .then((result,err) => {
            console.log(result)
            res.send(result)
        })
        .catch(err => {
            console(err)
        })
    }

    static voteAnswer(req,res) {
        Answer.findOne({_id: req.params.id})
        .then((result,err) => {
            if(err) return res.send(err)
            console.log(req.params.vote)
            result.votes = 1
            console.log(result)
            res.send(result)
        })
    }
}

module.exports = post