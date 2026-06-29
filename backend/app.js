const express=require("express");
const mongoose=require("mongoose");
const Log = require("./models/Log");
require("dotenv").config();

const app=express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const cors = require("cors");
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err))

app.get("/",(req,res)=>{
    res.send("API is running");
})


app.post("/logs",async(req,res)=>{
    try{
        const logs= req.body;
        if(!Array.isArray(logs)){
            return res.status(400).json({message:"Send an array of logs"});
        }

        const result = await Log.insertMany(logs, {ordered:false});

        res.status(201).json({
            message: "Logs inserted successfully",
            count : result.length
        });
    }
    catch(error){
        res.status(500).json({error : error.message});
    }
});

app.get("/logs", async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      severity,
      status,
      role,
      sortBy = "timestamp",
      order = "desc"
    } = req.query;


    const allowedSortFields = ["timestamp", "severity", "actor"];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = "timestamp";
    }


    page = parseInt(page) || 1;
    limit = Math.min(parseInt(limit) || 10, 100);

    let filter = {};

    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (role) filter.role = role;


    if (search) {
      filter.$or = [
        { actor: { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } },
        { resource: { $regex: search, $options: "i" } }
      ];
    }


    let sortOrder = order === "asc" ? 1 : -1;

    const logs = await Log.find(filter)
      .lean()
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Log.countDocuments(filter);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: logs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});