const { MongoClient } = require('mongodb');

let dbConnection

module.exports={
    connectToDb:(cb)=>{
        MongoClient.connect('mongodb+srv://quizdata:U23bjK8mOXgvSJil@quiz.wmufbkq.mongodb.net/?retryWrites=true&w=majority')
        .then((client)=>{
            dbConnection=client.db('htmldb')
            return cb()
        })
        .catch(err=>{
            console.log(err)

        })
    },
    getDb:()=>dbConnection
}
