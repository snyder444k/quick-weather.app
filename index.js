import express, { response } from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_KEY = "784b8e8e19bc8ba8ac41e6b4d7542228";

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");


app.get("/", (req,res)=>{
   res.render("index.ejs",{starter:""});
});


app.post("/submit", async(req,res)=> {
    try{
    const city = req.body.location;
   const response = await axios.get(`https://api.weatherstack.com/current?access_key=784b8e8e19bc8ba8ac41e6b4d7542228&query=${city}`);
    console.log(response);
   const result = response.data; 
    res.render("index.ejs",{
        content: {
            "location": result.request.query,
            "temperature": result.current.temperature,
            "icon": `<img src="${result.current.weather_icons[0]}">`,
            "sunrise": result.current.astro.sunrise,
            "sunset":result.current.astro.sunset,
            "description": result.current.weather_descriptions[0]
        }
    });
  
} catch(error) {
    console.log(error.message);
      console.log(error.response.data.error.info);
      res.render("index.ejs",{starter: error.message});
    }
  
}); 


app.listen(port, ()=> {
    console.log(`server running on port ${port}`);
});