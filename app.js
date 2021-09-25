require('dotenv').config()
const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

app=express();

// app.use(bodyparser({ex}))

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));

app.post("/",function(req,res){
  var firstName=req.body.FirstName;
  var lastName=req.body.LastName;
  var email=req.body.Email;
 console.log(firstName);
const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNMAE:firstName,
        LNAME:lastName
      }
    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us1.api.mailchimp.com/3.0/lists/"+LIST_ID;
const options={
  method:"POST",
  auth:"NithinTA:"+API_KEY
}
const request=https.request(url,options,function(response){

  if (response.statusCode===200) {
  
    res.sendFile(__dirname+"/success.html");
  } else {
    res.sendFile(__dirname+"/failure.html");
      
  }
  response.on("data",function(data){
  })
})
request.write(jsonData);
request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.listen(process.env.PORT||"3000",function(){
  console.log("server is running on port 3000");
})
//heroku site:https://damp-brook-86796.herokuapp.com/
