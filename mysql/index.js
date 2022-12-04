const mysql = require('mysql');
const sql = require('./sql.js');
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit :  process.env.LIMIT, 
    host : process.env.HOST, 
    port : process.env.PORT, 
    user : process.env.DB_USER, 
    password : process.env.PASSWORD, 
    database :  process.env.DB
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
