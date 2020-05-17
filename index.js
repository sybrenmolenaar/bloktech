const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Statically serve public folder
app.use(express.static('public'))


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
// Set up routes
// app.get('/users/:userId', (req, res) => { 
//   if (req.params.userId > users.length - 1) { 
//     res.send(`User ${req.params.userId} not found`)
//   } else {
//     res.send(`Hello ${users[req.params.userId].name}`)
//   }
// })
// http://localhost:3000/users/0


app.get('/users/:username/photos/:photoId', (req, res) => { 
  // console.log(req.params)
  // res.send(`This is the profile of @${req.params.username}`)
  const user = req.params.username // 'sybrenmolenaar'
  const photoId = req.params.photoId // 1
  console.log(photoId)
  res.send(`
    <h1>Hi ${users[user].name}, jouw username is @${user}</h1>
    
    Dit is jouw foto:
    
    <img src="${users[user].photos[photoId]}"/>`)
})

// http://localhost:3000/users/didiercatz/photos/0
// http://localhost:3000/users/sybrenmolenaar/photos/0

const routes = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
  '*': '404.html',
}

for (let [route, source] of Object.entries(routes)) {
  app.get(route, (req, res) => res.sendFile(`${__dirname}/public/${source}`))
}


app.listen(port, () => {  
  console.log(`App running on http://localhost:${port}`)
})