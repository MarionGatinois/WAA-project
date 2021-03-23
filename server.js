const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;


app.use("/ex1",express.static('1Assignement/'))
app.use("/ex3",express.static('3Assignement/'))

io.on('connection', (socket) => {
    console.log("connected")
    socket.on('drawing', msg => {
        //console.log(msg)
        io.emit('drawing', msg);
    });
});

app.get('/',function(req,res){
  res.send("here you can test different exercices : <ul> <li><a href='/ex1'>1Assignement</a></li><li><a href='/ex3'>3Assignement</a></li></ul>");
});


http.listen(port, function() {
    console.log(`server running at http://localhost:${port}/`);
});
