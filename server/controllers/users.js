var User = require('../models/users');


class UserController{
  static getAll(req,res){
    User.find({}).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static getID(req,res){
    User.findOne({userid:req.params.id}).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }


  static addNew(req,res){
    let insert={
      userid:req.body.userid,
      name :req.body.name,
      email:req.body.email,
      imgUrl:req.body.imgUrl
    }
    User.create(insert).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
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
