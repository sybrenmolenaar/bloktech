const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;



// Statically serve public folder
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 

app.engine('hbs', handlebars({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.get('/users', (req, res) => {
//   res.render('users.hbs')
//  })


let db;
const db_key = "mongodb+srv://sybrenmolenaar:M@ngo132!@cluster0-e62vx.gcp.mongodb.net/musiclovers?retryWrites=true&w=majority";
MongoClient.connect(db_key, function (err, client) { if (err) { throw err } else {} db = client.db("musiclovers"); });


const users = {
  sybrenmolenaar: {
    name: 'Sybren Molenaar',
    photos: [
      'https://unsplash.it/300/300'
    ]
  },
  didiercatz: {
    name: 'Didier Catz',
    photos: [
      'https://unsplash.it/500/500'
    ]
  }
}

// http://localhost:3000/users/didiercatz/
app.get('/users/:username', (req, res) => { 
  
  const username = req.params.username
  const photoId = req.params.photoId
  
  res.render('users.hbs', {
    username: username,
    name: users[username].name,
  })
})


// http://localhost:3000/users/didiercatz/photos/0
app.get('/users/:username/photos/:photoId', (req, res) => { 
  
  const username = req.params.username
  const photoId = req.params.photoId
  
  res.render('users.hbs', {
    username: username,
    name: users[username].name,
    photo: users[username].photos[photoId]
  })
})
app.get('/about', (req,res) => {
    res.render('about.hbs', {
        title:'About Me',
        description:'Hallo, ik ben Sybren'
    });
});

app.get('/home', (req,res) => {
    res.render('home.hbs', {
    title:'Home page',
    description:'Home of MusicLovers'
    })
})

app.get('/login', (req,res) => {
    res.render('login.hbs', {
    title: 'Log-in',
    description: 'Log-in page'
  })
})

app.get('/register', (req,res) => {
  res.render('register.hbs', {
  title: 'register',
  description: 'Register page'
})
})
//geholpen door Max Hauser

app.post('/register', add_user)

function add_user(req, res, next) {
  // Voeg een user toe aan de database
  db.collection('users').insertOne({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    genre: req.body.genre
  }, done)
  function done(err, data) {
    if (err) {
      next(err)
    } else {
      res.redirect('/admin')
    }
  }
}


app.post('/login', (req, res)=>{
  console.log(req.body)

})

const routes = {
  '/': 'index.html',
  '/about': 'views/about.hbs',
  '/contact': 'contact.html',
  '*': '404.html',
}

for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => res.sendFile(`${__dirname}/public/${source}`))
}


app.listen(port, () => {  
  console.log(`App running on http://localhost:${port}`)
})