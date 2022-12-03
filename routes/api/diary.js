const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var jwt = require('jsonwebtoken');
var {verifyToken} = require('./jwtverify');
require("dotenv").config();

/*일기 등록*/
router.post("/putDiary",verifyToken,async (req,res)=>{
    let body ='';
            req.on('data',(data)=>{
            body += data;
            
        });

        console.log(req.body.title);
    const time = Date.now();
    const createDate = new Date(time);
    console.log(time);
    console.log(createDate);
    var code = (time + Math.random()).toString();
    var diaryCode = Buffer.from(code, "utf8").toString('base64');
    console.log(diaryCode);
    const userid = req.decoded.id;

    var sql={
        userId : userid,
        title : req.body.title,
        content : req.body.content,
        createDate : createDate,
        diaryCode : diaryCode
    }
    try{
        await mysql.query("putDiary", sql);
        return res.status(200).json({
            userid : userid,
            message : "일기생성 성공",
            createDate : createDate,
            diaryCode : diaryCode
    
        });; 
    }
    catch(err){
        console.log(err);
        return res.status(200).json({
            message : "일기생성 실패"
    
        });; 
    }

});

router.get('/payload', verifyToken, (req, res) => {
    const id = req.decoded.id;
    //const profile = req.decoded.profile;
    return res.status(200).json({
      code: 200,
      message: '토큰은 정상입니다.',
      data: {
        id : id
      }
    });
  });

module.exports = router;