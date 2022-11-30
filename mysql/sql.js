module.exports={
    getID :`select name from users`,
    
    userInsert: `insert into users set ?`,

    getPassword : 'select password,salt from users where name = ? '
}