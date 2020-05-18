const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const handlebars = require('express-handlebars')

// Statically serve public folder
app.use(express.static('public'))

app.engine('hbs', handlebars({ extname: 'hbs' }))
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.get('/users', (req, res) => {
//   res.render('users.hbs')
//  })


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