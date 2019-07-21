var express=require('express');
var router = express.Router();
var userModel = require('../models/models')
const mongoose = require('mongoose');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var util = require('../utility/util')

router.get('/',function(req, res){
    var body = req.body;
    let name = body.hasOwnProperty('name') ? body['name'] : null ;
    let username = body.hasOwnProperty('username') ? body['username'] : null ;
    let password = body.hasOwnProperty('password') ? body['password'] : null ;

    if(name == null || username == null || password ==null){
        res.status(300).send("please provide correct data");
    }else{

        let secret = fs.readFileSync(path.join(__dirname, '../keys/privateKey.txt'));
        const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
        var user = new userModel({
            _id: new mongoose.Types.ObjectId(),
            Name: name,
            userName: username,
            password: hash
        });
        util.findOne(userModel,{"userName" : username},function(err,sucess){
            if(err){
                res.status(502).send(err)
            }else{
                if(sucess != null){
                    res.status(207).send("username is already in use")
                }else{
                    util.insertOne(userModel, user, function(err,response){
                        if(err){
                            res.status(502).send(err)
                        }else{
                            res.status(200).send("successfully created")            
                        }
                    })
                }
            }
        })
    }

})

module.exports = router;