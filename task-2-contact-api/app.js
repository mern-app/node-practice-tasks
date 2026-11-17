import express from "express";

const app = express();
app.use(express.json());

const messages = [];

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body ?? {};
    // console.log(req.body);

    // if name, email or message is missing
    // -> res.status(400).json({ success: false, message: "All fields are required" });
    if(!name || !email || !message) {
       res.status(400).json({ success: false, message: "All fields are required" });
    }

    // create {id: message.length + 1, name, email, message }
    // and push it into the messages array
    messages.push({id: messages.length + 1, name, email, message });

    res.status(201).json({ success: true, message: `Thanks ${name}!` });
});

app.get("/api/contact", (req, res) => {
    // send all messgages with res.json()
    const message = messages.length > 1 ? "messages list fetched" : "no messages are there";
    res.status(200).json(messages);
});

app.listen(3000, () => console.log("Server runing at http://localhost:3000"));
