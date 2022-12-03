const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index.js");
var jwt = require('jsonwebtoken');
var {verifyToken} = require('./jwtverify');
require("dotenv").config();

/*즐겨찾기 등록*/
router.post("/putFavorite",verifyToken,async (req,res)=>{
    const userid = req.decoded.id;
    
    const verifyFavorite = await mysql.query("getFavorite", userid);
    for(i in verifyFavorite){
        if(verifyFavorite[i].favorite == req.body.name){
            await mysql.query("deleteFavorite", [userid, req.body.name]);
            return res.status(200).json({
                message : "즐겨찾기 삭제성공",
                userid : userid,
                favorite : req.body.name
        
            });; 
        }
    }

    var sql={
        userId : userid,
        favorite : req.body.name
    }

    const favorite = await mysql.query("putFavorite", sql);

    return res.status(200).json({
        message : "즐겨찾기 등록 성공",
        userid : userid,
        favorite : req.body.name

    });; 
});

/*즐겨찾기 등록*/
router.get("/getFavorite",verifyToken,async (req,res)=>{
    const userid = req.decoded.id;

    const favorite = await mysql.query("getFavorite", userid);

    return res.status(200).json({
        message : "즐겨찾기 불러오기 성공",
        userid : userid,
        favorite : favorite

    });; 

});

module.exports = router;