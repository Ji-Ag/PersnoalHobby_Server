const express = require('express');
const { response } = require('../../app.js');
const router = express.Router();
const mysql = require("../../mysql/index.js");

router.get('/test',async(req,res)=>{
   
    const existid = await mysql.query("getID");
    res.send(existid);
    });

//아이디 중복체크
router.get("/checkId", async(req,res)=>{
    console.log("중복체크요청");
    //var success = false;
    var message ="";
    try{
     const existid = await mysql.query("getID");
    //req.on('end',()=>{
    //     let body =''; //왜 body는 null?
    //     req.on('data',(data)=>{
    //      body += data;
    //  });
     //console.log(`body${req.body}`);
     for(i in existid){
            
        if(req.query.id===existid[i].name){
            index = -1;
            console.log("같아");
            
            return res.status(600).json({
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

module.exports = router;