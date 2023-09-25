const express=require("express")
const bodyParser=require("body-parser");
const multer=require("multer");



const app = express();
const port = process.env.PORT || 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",upload.single('image'),(req,res)=>{
    if (!req.file) {
        res.status(400).send("No image uploaded");
        return;
    }

    const imageBuffer = req.file.buffer;
    // You can process the image buffer here as needed

    // Respond with a message indicating successful processing
    res.send("Image received and processed successfully\n"+imageBuffer);
})
app.listen(port,()=>{
    console.log("server started on "+port);
})