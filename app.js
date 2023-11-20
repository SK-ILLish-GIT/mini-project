const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");
const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const FormData = require("form-data");
const https = require("https");

const app = express();
const port = process.env.PORT || 3000;

// Multer upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "input_image.bmp");
  },
});
var upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { prediction: null });
});
app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/predict", upload.single("input_image"), async (req, res) => {
  if (!req.file) {
    res.status(400).send("No image uploaded");
    return;
  }

  try {
    const imagePath = path.join(__dirname, "uploads", req.file.filename);

    // Read the image file as binary data
    const imageData = fs.readFileSync(imagePath);

    // Create a new FormData instance and append the image data
    const formData = new FormData();
    formData.append("image", imageData, { filename: "input_image.bmp" });

    // Make a POST request to the Flask API using http.request
    let options = {}
    if (process.env.PORT) {
        options = {
            hostname: 'pysem5projectapi.onrender.com',
            port: 443,  // Assuming you are using the default HTTPS port
            path: '/',
            method: 'POST',
            headers: formData.getHeaders(),
        };
    } else {
      options = {
        hostname: "172.20.70.243",
        port: 5001, // Assuming you are using the default HTTPS port
        path: "/",
        method: "POST",
        headers: formData.getHeaders(),
      };
    }

    const apiReq = http.request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const prediction = JSON.parse(data);
        // console.log('Body:', prediction);
        res.status(200).render("index", { prediction: prediction.prediction });
      });
    });

    apiReq.on("error", (err) => {
      console.log("Error: ", err);
      res.status(500).send("Internal Server Error");
    });

    // Send the FormData as the request body
    const buffer = await formData.getBuffer(); // Add await here
    apiReq.write(buffer);

    // End the request
    apiReq.end();
  } catch (error) {
    console.error("Error processing the image:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.listen(port, () => {
  console.log("server started on " + port);
});
