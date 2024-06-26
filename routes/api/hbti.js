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
                hbti : hbti[0].hbti,
                content : hbti[0].content,
                hobby : hbti[0].hobby
            });; 
        }
        catch{
            return res.status(500).json({
                message : "존재하지 않는 HBTI",
            });; 
        }
});

router.post("/setHBTI",verifyToken,async (req,res)=>{
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

router.get("/getUserHBTI",verifyToken,async (req,res)=>{
    const userid = req.decoded.id;
    try{
       const hbti = await mysql.query("getUserHBTI", userid);
             return res.status(200).json({
                 message : "유저의 HBTI 불러오기 성공",
                 userid : userid,
                 hbti : hbti[0].hbti
             });; 
         }
         catch{
             return res.status(500).json({
                 message : "유저의 HBTI 불러오기 실패",
             });; 
         }

});
module.exports = router;