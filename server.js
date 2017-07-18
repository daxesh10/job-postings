const
    express = require('express'),
    path = require('path'),
    firebase = require('./firebaseClient.js'),
    prettyjson = require('prettyjson'),
    options = {
  noColor: true
};

let app = express()
let port = process.env.PORT || 8081
app.use(express.static(path.join(__dirname)))
//app.use(require('./client/routes')())


app.get('/',(req,res)=>{

    res.sendFile("/index.html")
})

app.get('/jobs',(req,res)=>{

    res.sendFile(__dirname+"/client/views/jobs.html")
})

app.get('/jobs/linkedin',(req,res)=>{
    
    firebase.getValueObj("linkedin",data=>{
        
        res.send(data)
        res.end()
    })
    
})


app.get('/jobs/indeed',(req,res)=>{
    
    firebase.getValueObj("indeed",data=>{
        
        res.send(data)
        res.end()
    })
    
})

app.get('/jobs/monster',(req,res)=>{
    
    firebase.getValueObj("monster",data=>{
        
        res.send(data)
        res.end()
    })
    
})



app.get('/api/linkedin',(req,res)=>{

    let location = req.param("loc")
    let searchQuery = req.param("search")

    let r = { location:location,searchQuery:searchQuery}

    res.send(r)
    res.end()

})



app.listen(port,()=>{

    console.log('server running on. \n localhost:',port)
})