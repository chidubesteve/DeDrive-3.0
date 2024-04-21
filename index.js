require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");
const FormData = require("form-data");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP address",
});

app.set("trust proxy", 1);
app.use(express.json());
app.use(limiter);
app.use(cors());

const uploadDirectory = path.join(__dirname, "/uploads/");

// ensure that the directory exits
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

// Create the multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10mb max size

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype === "text/plain" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/epub+zip"
    ) {
      cb(null, true); //accept the file
    } else {
      // Reject the file
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  },
}).single("file");

app.post("/api/upload", async (req, res) => {
  upload(req, res, function (err) {
    // if (!req.file) {
    //   return res.status(400).send({ message: "No file was uploaded." });
    // }

    if (err instanceof multer.MulterError) {
      let message = "An error occurred when uploading.";
      if (err.code === "LIMIT_FILE_SIZE") {
        message = "File size exceeds the limit. Max-size: 10MB";
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Invalid file type!";
      }
      return res.status(400).send({ message });
    } else if (err) {
      // Handle custom errors or other errors here.
      return res
        .status(500)
        .send({ message: err.message || "A server error occurred." });
    } else {
      const file = req.file;
      const body = req.body;
      console.log("File is: ", file);
        
      const data = new FormData();
      const fileStream = fs.createReadStream(file.path);
      data.append("file", fileStream);
        
      // Optional parameters
      const metadata = JSON.stringify({
        name: file.originalname,
      });
      data.append("pinataMetadata", metadata);
        
      const options = JSON.stringify({
        cidVersion: 0,
      });
      data.append("pinataOptions", options);
        
      axios
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
          },
        })
        .then((pinataResponse) => {
          console.log(pinataResponse.data);
          return res.status(200).send(pinataResponse.data);
        })
        .catch((error) => {
          console.log("Error pinning file to IPFS:", error.message);
          return res
            .status(500)
            .send({ message: "Error pinning file to IPFS" });
        });
    };
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
