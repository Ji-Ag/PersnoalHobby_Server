module.exports={
    getID :`select userId from users`,
    
    userInsert: `insert into users set ?`,

    getPassword : 'select password,salt from users where userId = ? '
}