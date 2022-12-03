module.exports={

    //user
    getID :`select userId from users`,
    
    userInsert: `insert into users set ?`,

    getPassword : 'select password,salt from users where userId = ? ',

    //diary
    putDiary : `insert into diary set ?`,

    getDiary : `select title,content,diaryCode from diary where userId =?`,

    getBigDiary : `select title,content from diary where diaryCode =?`,

    setDiary : `update into diary set ?`,

    //favorite
    putFavorite : `insert into favorite set ?`,

    getFavorite : `select favorite from favorite where userId =?`,

    //HBTI
    getHBTIResult : `select result where hbti =?`,

    setHBTIResult : `update result where hbti = ?`
}