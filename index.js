const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
// app.get("/", (req, res) => {
//   res.json({ message: "imagecrud server is running" });
// });

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4lrtvjx.mongodb.net/imageCRUD?retryWrites=true&w=majority`,
    {
      dbName: "imageCRUD",
    },
    {
      collection: "cards",
    },

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  image: String,
  details: String,
});

const ImageModel = mongoose.model("card", schema);

app.post("/upload", async (req, res) => {
  console.log(req.body);
  const { img, details } = req.body;
  const image = new ImageModel({
    image: img,
    details: details,
  });
  await image.save();
  res.send({ message: "image upload successfully", success: true });
});

app.get("/", async (req, res) => {
  const data = await ImageModel.find({});
  console.log(data);
  res.json({ message: "All image and text", data: data });
});

app.listen(PORT, () => console.log("server is running at" + " " + PORT));
