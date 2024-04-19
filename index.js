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
}).single("file");

app.post("/upload", async (req, res) => {
  try {
    upload(req, res, function (err) {
      if (!req.file) {
        return res.status(400).send({ message: "No file was uploaded." });
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

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
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    });
  } catch (error) {
    console.error("Error uploading files: ", error);
    return res.status(500).json({ message: "Error uploading files." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
