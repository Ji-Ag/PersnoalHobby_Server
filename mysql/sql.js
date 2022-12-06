module.exports={

    //user
    getID :`select userId from users`,
    
    userInsert: `insert into users set ?`,

    getPassword : 'select password,salt from users where userId = ? ',

    //diary
    putDiary : `insert into diary set ?`,

    getDiary : `select title,content,diaryCode,createDate from diary where userId =?`,

    getBigDiary : `select title,content,createDate from diary where diaryCode =?`,

    setDiary : `update diary set title=?,content=?,createDate=? where diaryCode=?`,

    deleteDiary : `delete from diary where diaryCode=?`,

    //favorite
    putFavorite : `insert into favorite set ?`,

    getFavorite : `select favorite from favorite where userId =?`,

    deleteFavorite : `delete from favorite where userId=? and favorite=?`,

    //HBTI
    getHBTI : `select hbti,content,hobby from HBTI where hbti=?`,

    setHBTI : `update users set hbti=? where userId = ?`,

    getUserHBTI : `select hbti from users where userId=?`
}