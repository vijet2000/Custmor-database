const axios = require('axios')
var userDB = require('../model/model.js');


exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function(responce){
            res.render('index', {users:responce.data})
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_user =  (req, res) => {
    res.render('add_user.ejs');
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render('update_user.ejs', {user:userdata.data} );
        })
        .catch(err=>{
            res.send(err);
        })
}