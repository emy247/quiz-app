const { MongoClient } = require('mongodb');
require('dotenv').config({path:'./pass.env' });

const password = process.env.DB_PASS;

let dbConnection;

module.exports={
    connectToDb:(cb)=>{
        MongoClient.connect(`mongodb+srv://quizdata:${password}@quiz.wmufbkq.mongodb.net/?retryWrites=true&w=majority`)
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
