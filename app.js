const express=require("express")
const bodyParser=require("body-parser");
const multer=require("multer");
const Jimp = require('jimp');



const app = express();
const port = process.env.PORT || 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.urlencoded( { extended: true } ));
app.use(express.static('public'));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/", upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.status(400).send("No image uploaded");
        return;
    }

    try {
        const imageBuffer = req.file.buffer;
        const image = await Jimp.read(imageBuffer);

        // Convert the image to BMP
        const bmpBuffer = await image.getBufferAsync(Jimp.MIME_BMP);

        // Send the BMP image as a response
        res.set({
            'Content-Type': 'image/bmp',
            'Content-Disposition': 'attachment; filename=image.bmp'
        });
        res.send(bmpBuffer);
    } catch (error) {
        console.error("Error processing the image:", error);
        res.status(500).send("Error processing the image");
    }
});
app.listen(port,()=>{
    console.log("server started on "+port);
})