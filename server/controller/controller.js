const { restart } = require('nodemon');
var userDB = require('../model/model.js');

//create and save new user
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({ message  :"Content cannot be empty!!!"});
        return;
    }

    //new user
    const user = new userDB({
        name : req.body.name,
        email:req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user in data base
    user
        .save(user)
        .then(data => {
            // res.send(data);
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "some error occured while creating the create operation"
            })
        })
}

//retrive or return all or single users
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;
        userDB.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message : "Not found user with id" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(404).send({message: "Error retriving the message with id" + id})
            })
        }
    else{
        userDB.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message : err.message ||"Error occured while reterving user input"  });
    })
    }
}

//update a new identified user by user id 
exports.update = (req, res) => {
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update cannot be empty"});
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message:`Cannot update data with use ${id}. May be user not foune`})
            }
            else{
                userDB.updateData(id, req.body ,function(data){
                    res.send(data);
                    var request = {
                        "url" : `http://localhost:3000/api/users/${data.id}`,
                        "method" : "PUT",
                        "data" : data
                    }

                    if(request){
                        alert("Updated")
                    }
                    else{
                        res.send("Not-updated")
                    }

                    res.redirect('/update-user');
                 });

            }
        })
        .catch(err => {
            res.status(500).send({message:"Error update information"})
        })
}

//delete a user with a specified user id
exports.delete = (req, res) => {
    const id = req.params.id;

    userDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message:`we cannot delete with id: ${id}. May be user not foung`})
            }
            else{
                res.send({
                    message:"User deleted Successfully"
                })
            }
        })
    
        .catch(err => {
            res.status(500).send({
                message : "Could not delete user with id" +id
            })
        })
}




