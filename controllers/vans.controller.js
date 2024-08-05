const vanModel = require('../model/vans.model')
const jwt = require( 'jsonwebtoken' )

const userSignup = (req, res) => {
    console.log("User sign-up request received")
    console.log(req.body);
    const newUser = new vanModel(req.body)
    newUser.save()
        .then(data => {
            console.log("User saved successfully:");
       
            res.status(201).json({ message: "User created successfully", status:true})
        })
        .catch(error => {
            console.log(error)
            if (error.code == 11000) {
                res.send({message:"Email already exists", status:false});
            } else {
                res.send({message:"Internal Server Error"});
            }
        });
};

const userLogin = (req,res)=>{
    console.log(req.body);
    const email = req.body.email
    vanModel.findOne({email: req.body.email}).then((data)=>{
        console.log(data);
        if(!data){
         res.send({message:'User not registered' , status : false})
        } else if (req.body.email == data.email && req.body.password == data.password) {
       const token = jwt.sign({email}, "secret", {expiresIn:"4h"})
      //  console.log(token);
        res.send({message:"user has been found", status: true, token})
            }else{
        res.send({message: "Incorrect Email or Password"})
            }
    })
}

const userDashBoard = (req, res)=>{
    console.log(req.body);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "secret", (err,result)=>{
      if (err) {
        console.log(err);
        res.send({message:"jwt faileddd", status:false })
      }else{
        console.log(result);
        const email = result.email
        vanModel.findOne({email:email})
        .then((user) => {
          let userDetails = user
          console.log(user);
          if (user) {
              res.send({ message: 'user has been seen by jwt', userDetails});
          } else {
              res.status(404).json("No User Found");
          }
           
          }).catch((err)=>{
            console.log(err);
          })

      }
    })
    // const email=req.headers.bearer.split(' ')[1]
  }
  


module.exports = { userSignup,userLogin, userDashBoard }
