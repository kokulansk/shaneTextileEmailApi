import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmailSender from "./sendEmail.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5050;

app.post("/api", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    // Assuming EmailSender returns a promise
    try {
      await EmailSender({ fullName, email, phone, message });

      res.json({ msg: "Your message sent successfully" });
    }
    catch (err) {
      res.json({ msg: err });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ msg: "Internal Server Error ❌" });
  }
});

app.get("/", (req, res) => {
  res.send("hellow docker");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
