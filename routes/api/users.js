const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var jwt = require('jsonwebtoken');
var {verifyToken} = require('./jwtverify');
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

        console.log("userid", req.body.userid);
        //디코딩
        //var decodedPwd = Buffer.from(req.body[1], "base64").toString('utf8');
       // console.log("디코딩한 비번", decodedPwd);
   
        //암호화
        var userSalt = '';
        
    var opts = {
      password: req.body.userpwd,
     // salt : 10
    };
    
    hasher(opts, async function(err, pass, salt, hash) {
      opts.salt = salt;
      
        userSalt = salt;
        
        

    var sql={
        userId : req.body.userid,
        password : hash,
        salt : salt
    }
    await mysql.query("userInsert", sql);
   return res.status(200).json({
        id : req.body.userid,
        message:"회원가입 성공",
    });; 
        }); 
});

/*로그인*/
router.post("/login",async (req,res)=>{

    console.log("유효성체크중")
   
    const existid = await mysql.query("getID");
   
       ;
        //for(i in existid){
           // if(req.query.userid===existid[i].userId){
                console.log("등록된 회원, 비번일치하는지 확인하자")
               //디코딩
               //var decodedPwd = Buffer.from(req.query.userpwd, "base64").toString('utf8');
               try{
                const existpwd = await mysql.query("getPassword", req.body.userid);
               
                 //암호화
                var opts = {
                password: req.body.userpwd,
                salt : existpwd[0].salt
                };
               console.log(existpwd[0].salt);
                hasher(opts,async function(err, pass,salt, hash) {
                    if(existpwd[0].password == hash){
                        console.log("로그인 성공!");
                        var token = jwt.sign(
                            {
                                id: req.body.userid,
                            }, process.env.SECRETE,
                            {
                                expiresIn :"1h",
                                issuer : "토큰발급자",
                              
                            },
                            
                        )
                        res.status(200).json({
                            id: req.body.userid,
                            message:"로그인 성공! 토큰 발급 완료",
                            token : token,
                            code : 1,
                        });; 
                        
                        return ;
                    }else{
                        res.status(200).json({
                            id : req.body.userid,
                            message:"아이디 비밀번호를 확인해주세요",
                            code : -1,
                        });; return;
                        }   
                    }) 
           // }
            //}
            }catch{
                res.status(200).json({
                    id : req.body.userid,
                    message:"아이디 비밀번호를 확인해주세요",
                    code : -1,
                });; return;
               }
            // setTimeout(()=>{res.status(200).json({
            //     id : req.query.userid,
            //     message:"아이디 비밀번호를 확인해주세요",
            //     code : -1,
            // });; return;},10000)
            
});


module.exports = router;