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
const path = require('path');

// const http = require('http').createServer(app); // For socket connection 

const routes = require('./src/app/server/routing/route')

app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "dist/network")));


app.use('/',routes)





app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});


app.listen(5000,() =>{
    console.log('connection by 5000 port');
})


