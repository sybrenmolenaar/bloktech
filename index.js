const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// Statically serve public folder
app.use(express.static('public'))

// Set up routes
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