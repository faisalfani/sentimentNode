const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const Sentiment = require('sentiment')
const mongoose = require('mongoose')
const fs = require('fs')
const dataJson = require('./data/data.json');
const statusJson = require('./data/status.json');


const sentiment = new Sentiment();
const mongoOption = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}


mongoose.connect('mongodb://localhost:27017/scraping',mongoOption)

const Schema = mongoose.Schema

var statusSchema = new Schema({
    positive : {
      val : Number,
      persentage : Number
    },
    negative : {
        val : Number,
        persentage : Number
      },
    neutral : {
    val : Number,
    persentage : Number
    },
    Total : Number
})

var dataSchema = new Schema({
    data : String,
    score : Number,
    cat : String
})
var Data = mongoose.model('data',dataSchema)
var Status = mongoose.model('status',statusSchema)

// //get data all data
// Data.find((err,data)=>{
//     if (!err) {
//         json = JSON.stringify(data)
//         fs.writeFile ("data.json", json, function(err) {
//             if (err) throw err;
//             console.log('complete');
//             }
//         );
//         console.log('success');
        
            
//         }else{
//             console.log(err);
            
//         }
//     })

//get data status
// Status.find((err,data)=>{
//     if (!err) {
//         json = JSON.stringify(data)
//         fs.writeFile ("status.json", json, function(err) {
//             if (err) throw err;
//             console.log('complete');
//             }
//         );
//         console.log('success');
        
            
//         }else{
//             console.log(err);
            
//         }
//     })


// var status = new Status({
//     positive : {
//         val : 265,
//         persentage : 26.2
//       },
//       negative : {
//           val : 85,
//           persentage : 8.5
//         },
//       neutral : {
//       val : 660,
//       persentage : 65.3
//       },
//       Total : 1010
//    })
// status.save()

// function getData(x) {
//     Data.countDocuments({cat : x},(err,count)=>{
//         if (!err) {
//            return count;
//         }else{
//             console.log(err);
            
//         }
//     })
    
// }



// for (let x = 0; x < 101; x++) {
//     request('https://en.antaranews.com/search/jokowi/'+x,(error,Response,body)=>{
//     $ = cheerio.load(body);
//     const container = $(".post-content")
    
//         for (let index = 0; index < 10; index++) {
//             scrap = container.children().eq(index).text().replace(/\s\s+/g,"")
//             score = sentiment.analyze(scrap)
//             if (score.score === 0) {
//                 category = "neutral"
//             }else if (score.score <= 0) {
//                 category = "negative"
//             }else{
//                 category = "positive"
//             }
//             var data = new Data({
//                 data : scrap,
//                 score : score.score,
//                 cat : category

//             })
//             data.save();
            
//         }

    
//     })

// }

const app = express()

app.get('/',(req,res)=>{
    res.send("try /api/data, /api/status")
})

app.get('/api/data',(req,res)=>{
    // Data.find((err,data)=>{
    //     if (!err) {
    //         res.json(data);
    //     }else{
    //         console.log(err);
            
    //     }
    // })
    res.json(dataJson)
})

app.get('/api/status',(req,res)=>{
    // Status.find((err,data)=>{
    //     if (!err) {
    //         res.json(data)
    //     }
    //     else{
    //         console.log(err);
            
    //     }
    // })
    res.json(statusJson)
})


app.listen(3000,()=>{
    console.log("berjalan di port 3000");
    
})