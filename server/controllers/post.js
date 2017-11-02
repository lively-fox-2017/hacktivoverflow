var Post = require('../models/post')
var jwt = require('jsonwebtoken')


class post{
    static get(req,res) {
        Post.find({})
        .then((result,err) => {
            if(err) return res.send(err)

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
            views: 0,
            date: { type: Date, default: Date.now() }
        })
        res.send(newPost)
        // newPost.save()
        // .then((user, err) => {
        //     if(err) return res.send(err)
            
        //     res.send(user)
        // })
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
        .then((article,err) => {
            if(err) return res.send(err)

            res.send(article)
        })
    }
}

module.exports = post