const express = require('express');
const { response } = require('../../app.js');
const router = express.Router();
const mysql = require("../../mysql/index.js");

router.get('/test',async(req,res)=>{
    try{
    const existid = await mysql.query("getID");
    res.send(existid);}
    catch(err){
        console.log(err);
    }
})
//아이디 중복체크
router.post("/checkId", async(req,res)=>{
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
    
     return res.status(200).json({
        id : req.body,
        pwd : req.body.id,

    });; 

        // res.send({
        //     "name" : body});
            // console.log('받은 이름',body); 
            // for(i in existid){
                
            //     if(req.params.id===existid[i].userid){
                    
            //         console.log("같아");
            //         res.data = {
            //             "success" : "false",
            //             "message" : "중복 아이디 존재"
            //         };
            //         return res.end(data); //res.end()해야 클라이언트에게 정보 전달하고 끝남
            //     // res.end(index);
            //         //같은 id 발견하자마자 res.end 하고싶어
            //     }
            // }
            // res.end(data);
        
       // });

    }catch(err){
        console.log(err);
    }
    
    
});

module.exports = router;