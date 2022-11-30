const mysql = require('mysql');
const sql = require('./sql.js');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit :  10,//process.env.LIMIT, 
    host : 'firstserver.ctk6srnbe3rf.us-east-1.rds.amazonaws.com',//process.env.HOST, 
    port : '3306',//process.env.PORT, 
    user : 'admin',//process.env.DB_USER, 
    password : 'mysqlqlqjs1',//process.env.PASSWORD, 
    database :  "firstserver"
});

const query = async (alias,values)=>{
    return new Promise((reslove,reject)=>
    pool.query(sql[alias],values,(error,results)=>{
        if(error){
            console.log(error);
            reject({
                error,
            });
        }else reslove(results);
        })
    );
};

module.exports ={
    query,
}
