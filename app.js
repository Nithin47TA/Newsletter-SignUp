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
const url="https://us1.api.mailchimp.com/3.0/lists/20322077bd";
const options={
  method:"POST",
  auth:"NithinTA:0230d71f095edfcbd8bc7083d30d1178-us1"
}
const request=https.request(url,options,function(response){

  if (response.statusCode===200) {
    res.sendFile(__dirname+"/failure.html")

  } else {
      res.sendFile(__dirname+"/success.html")
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
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

// api key:0230d71f095edfcbd8bc7083d30d1178-us1
//list id :20322077bd
