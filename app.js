const express=require("express")
const bodyParser=require("body-parser");
const multer=require("multer");
const Jimp = require('jimp');
const path = require('path');
const http = require('http');
const fs = require('fs');




const app = express();
const port = process.env.PORT || 3000;


// Multer upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/", upload.single('input_image'), async (req, res) => {
    if (!req.file) {
        res.status(400).send("No image uploaded");
        return;
    }

    try {
        // Make a POST request to the Flask API using http.request
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: '/',
            method: 'POST',
        };
        const apiReq = http.request(options, (apiRes) => {
            let data = '';
    
            apiRes.on('data', (chunk) => {
                data += chunk;
            });
    
            apiRes.on('end', () => {
                prediction = JSON.parse(data);
                console.log('Body:', prediction);
                
                // Send the response to the client here
                res.status(200).send("<h1>"+prediction.prediction+"</h1>" );
            });
        });
    
        apiReq.on("error", (err) => {
            console.log("Error: ", err);
        });
    
        // End the request
        apiReq.end();
        
    } catch (error) {
        console.error('Error processing the image:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port,()=>{
    console.log("server started on "+port);
})