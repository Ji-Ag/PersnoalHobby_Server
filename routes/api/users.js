const express = require('express');
const { response } = require('../../app.js');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
require("dotenv").config();

router.get('/test',async(req,res)=>{
   
    const existid = await mysql.query("getID");
    res.send(existid);
    });

/*아이디 중복체크*/
router.get("/checkId", async(req,res)=>{
    console.log("중복체크요청");
    //var success = false;
    //var message ="";
    try{
     const existid = await mysql.query("getID");
    //req.on('end',()=>{
    //     let body =''; //왜 body는 null?
    //     req.on('data',(data)=>{
    //      body += data;
    //  });
     //console.log(`body${req.body}`);
     console.log(existid);
     console.log(req.query.id);
     for(i in existid){
            
        if(req.query.id===existid[i].userId){
            index = -1;
            console.log("같아");
            
            return res.status(200).json({
                id : req.query.id,
                message : "중복 아이디 존재",
                success : false,
                index : -1
        
            });; 
        }
    }

    return res.status(200).json({
        id : req.query.id,
        message : "중복 아이디 없음",
        success : true,
        index : 1
    });; 

    }catch(err){
        console.log(err);
    }
    
    
});

/*회원가입*/
router.post("/register", async(req,res)=>{
    console.log("신규회원 등록중");
        let body ='';
            req.on('data',(data)=>{
            body += data;
            
        });
        //디코딩
        var decodedPwd = Buffer.from(req.body[1], "base64").toString('utf8');
        console.log("디코딩한 비번", decodedPwd);
   
        //암호화
        var userSalt = '';
        
    var opts = {
      password: decodedPwd,
     // salt : 10
    };
    
    hasher(opts, async function(err, pass, salt, hash) {
      opts.salt = salt;
      
        userSalt = salt;
        
        

    var sql={
        userid : req.body[0],
        pwd : hash,
        salt : salt
    }
    await mysql.query("userInsert", sql);
   return res.status(200).json({
        id : req.body[0],
        message:"회원가입 성공",
    });; 
        }); 
});

module.exports = router;