import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import EmailSender from "./sendEmail.js";
import path from 'path';

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 5000;

app.post("/send", async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;
    EmailSender({ fullName, email, phone, message });
    res.json({ msg: "Your message sent successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error ❌" });
  }
});


app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
