const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const id = Date.now().toString();
        cb(null, id + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {

    const fileName = req.file.filename;

    res.json({
        url: `/watch.html?video=${fileName}`
    });

});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});