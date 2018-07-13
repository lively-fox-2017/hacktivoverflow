require('dotenv').config()
const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 9;
const jwt = require('jsonwebtoken');


class UserController{
  static getAll(req,res){
    User.find({}).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static getID(req,res){
    User.findOne({userid:req.body.username}).then(result=>{
      const cpass = bcrypt.compareSync(req.body.password, result.password)
      if (cpass) {
        const token = jwt.sign({ userid: result._id }, process.env.SECRET);
        res.status(200).json({ token: token, userid: result.userid, id: result._id })
      } else{
        res.status(400).json('please check username and password')
      }
    }).catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })
  }


  static addNew(req,res){
    let hash = bcrypt.hashSync(req.body.password, saltRounds);
    let insert={
      userid:req.body.username,
      // name :req.body.name,
      password:hash
      // salt:req.body.salt
    }
    User.create(insert).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      console.log(err);
      res.status(500).json(err)
    })

  }

  static editData(req,res){
    let condition={
      userid : req.params.id
    }
    let newData={
        $set:{
          name :req.body.name,
          email:req.body.email,
          imgUrl:req.body.imgUrl
        }
      }
      User.update(condition,newData).then(result=>{
        if(result.n==1){
          User.findOne({userid:req.params.id}).then(result=>{
            res.status(200).json(result)
          }).catch(err=>{
            res.status(500).json(err)
          })
        }else{
          res.status(500).json('data not found')
        }
      }).catch(err=>{
        res.status(500).json(err)
      })
      }

  static deleteData(req,res){
    let condition={
      userid : req.params.id
    }
    User.findOneAndRemove(condition).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)

    })
    }
}

module.exports = UserController;
