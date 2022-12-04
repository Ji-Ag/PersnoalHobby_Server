const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var jwt = require('jsonwebtoken');
var {verifyToken} = require('./jwtverify');
require("dotenv").config();


/*HBTI 결고불러오기*/
router.get("/getHBTI",async (req,res)=>{
    try{
       const hbti = await mysql.query("getHBTI", req.query.hbti);
            return res.status(200).json({
                message : "HBTI 결과 불러오기 성공",
                hbti : hbti.hbti,
                content : hbti.content,
                hobby : hbti.hobby
            });; 
        }
        catch{
            return res.status(500).json({
                message : "존재하지 않는 HBTI",
            });; 
        }
});

router.get("/setHBTI",verifyToken,async (req,res)=>{
    const userid = req.decoded.id;
    try{
        await mysql.query("setHBTI", [req.body.hbti,userid]);
             return res.status(200).json({
                 message : "HBTI 저장성공",
                 userid : userid,
                 hbti : req.body.hbti,
             });; 
         }
         catch{
             return res.status(500).json({
                 message : "존재하지 않는 HBTI",
             });; 
         }

});

module.exports = router;