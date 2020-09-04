const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
var knex = require('knex')
const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image  = require('./Controller/image');
const app = express();

app.use(express.json());
app.use(cors());


const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smart-brain'
    }
  });

  db.select().table('users').then(data=> {console.log(data)});

app.get('/', (req,res)=>{res.send("Server is running")})
app.post('/signin', (req,res)=>{ signin.signinHandler(req,res,db,bcrypt)});
app.post('/register', (req,res) =>{ register.registerHandler(req,res,db,bcrypt)});
app.get('/profile/:id', (req,res)=>{profile.profileHandler(res,req,db)});
app.put('/image', (req,res)=>{image.imageHandler(req,res,db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});



app.listen(4000, ()=>{
    console.log('App is running on port 4000');
});


