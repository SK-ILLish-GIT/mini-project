const express=require("express")
const bodyParser=require("body-parser");
const multer=require("multer");
const Jimp = require('jimp');
const path = require('path');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');




const app = express();
const port = process.env.PORT || 3000;


// Multer upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, "input_image.bmp")
    }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render('index',{prediction:null});
    
})
app.get("/about",(req,res)=>{
    res.sendFile(__dirname + "/public/about.html");
    
})
app.get("/contact",(req,res)=>{
    res.sendFile(__dirname + "/public/contact.html");
    
})


app.post("/", upload.single('input_image'), async (req, res) => {
    if (!req.file) {
        res.status(400).send("No image uploaded");
        return;
    }

    try {
            // Use the 'path' module to join the current directory with the 'uploads' folder
            const imagePath = path.join(__dirname, 'uploads', 'input_image.bmp');
            console.log(imagePath)


        // Read the image file as binary data
        const imageData = fs.readFileSync(imagePath);

        // Make a POST request to the Flask API using http.request
        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'image/bmp', // Set the appropriate content type for your image
            },
        };

        const apiReq = http.request(options, (apiRes) => {
            let data = '';

            apiRes.on('data', (chunk) => {
                data += chunk;
            });

            apiRes.on('end', () => {
                const prediction = JSON.parse(data);
                console.log('Body:', prediction);

                // Send the response to the client here
                // res.status(200).send("<h1>"+prediction.prediction+"</h1>");
                console.log(prediction.prediction);
                res.status(200).render('index',{prediction:prediction.prediction});
            });
        });

        apiReq.on("error", (err) => {
            console.log("Error: ", err);
        });

        // Send image data in the request body
        apiReq.write(imageData);

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