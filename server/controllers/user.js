var User = require('../models/user')
var jwt = require('jsonwebtoken')

class user{
    static get(req,res) {
        User.find({})
        .then((result,err) => {
            if(err) return res.send(err)

            res.send(result)
        })
    }

    static post(req,res) {
        console.log(req.body)
        var newUser = new User(req.body)

        newUser.save()
        .then((user, err) => {
            if(err) return res.send(err)
            
            res.send(user)
        })
        // res.send(newUser)
    }

    static put(req,res) {
        console.log(req.params.id)
        console.log(req.body)
        // Article.findOne({_id: req.params.id})
        // .then((article, err) => {
        //     if(err) return res.send(err)
        //     console.log(article)
        //     res.send(article)
        // })
        User.findOneAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })
        .then((result, err) => {
            if(err) return res.send(err)

            res.send(result)
        })
    }

    // static del(req,res) {
    //     User.findOneAndRemove({_id: req.params.id})
    //     .then((result,err) => {
    //         if(err) return res.send(err)
    //         console.log(result)
    //         res.send(result)
    //     })
    //     // res.send(req.body)
    // }

    static login(req,res) {
        User.findOne({username: req.body.username})
        .then(user => {
            if(req.body.password === user.password) {
                var token = jwt.sign({
                    id: user._id,
                    username: user.username,
                    email: user.email
                }, 'hacktivoverflow')
                res.send(token)
            }
            res.send(false)
        })
    }
}

module.exports = user