const express = require('express');
const app = express();
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
app.use(express.static(path.join(__dirname,'views')));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const nexmo = new Nexmo({
    apiKey: '',
    apiSecret : ''
})
app.get('/',(req,res)=>{
  res.send("HELLO WORLD")
})
app.post('/', (req,res)=>{
    // 8700187916 Sarthak Arora
    //Here we retreive the emergency POST data and save it
    //and make it into a nice message to be sent to the user
    var body = "EMERGENCY ";
    var name = ""; //here get the user's name
    var number = "33754284224";//static for some time but get it from POST 
    var location = ""; //get this directly as the google maps link
    // yet to implement -- live location tracking
    // var liveLocation 
    body = body + " " + name + " needs HELP. His contact number is " + number + " His location is " + location; 
nexmo.message.sendSms(
    'NEXMO', number, body,
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      }
   );
   res.send("Hello"); 
})


app.listen(8080);
