const express = require('express');
const router = express.Router();
const mysql = require("../../mysql/index");

//아이디 중복체크
router.post("/checkId", async(req,res)=>{
    console.log("중복체크요청");
    //var success = false;
    var message ="";
    const existid = await mysql.query("getID");
    req.on('end',()=>{
        
        console.log('받은 이름',body); 
        for(i in existid){
            
            if(req.id===existid[i].userid){
                
                console.log("같아");
                res.data = {
                    "success" : "false",
                    "message" : "중복 아이디 존재"
                };
                return res.end(); //res.end()해야 클라이언트에게 정보 전달하고 끝남
               // res.end(index);
                //같은 id 발견하자마자 res.end 하고싶어
            }
        }
        res.end(index);
       
    });
});

module.exports = router;