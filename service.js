/* 
 Core Modules (already decleare in file [ fs,Buffer,Http])
        - Global module  - Without any import module
        - Local module   - Import in fle 

npm init (create file structure)

Node is single threading 

Node is asynchronous (it is not wait for response)
        second task  do not wait to finish first task

Os Module in Nodes 
    system cpu memory etc . all information

Event Emitter
    capture event in funtion 

REPL (Read Eval Print Loop)
    js and node run on cmd line
*/



const express = require('express')
var cors = require('cors')
const app = express()
// const http = require('http').createServer(app); // For socket connection 

const routes = require('./server/routing/route')

app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
// app.use('/',routes)





app.get("*", (req, res) => {
    // console.log(res);
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "network/index.html"));
});


app.listen(5000,() =>{
    console.log('connection by 5000 port');
})


