const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Remus'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Roma',
    name: 'Romulus'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help title',
    message: 'This is your message',
    name: 'Caesar'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        } else {
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
          })
        }
      })
    }
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('errors', {
    title: 'Help error',
    error: 'Help article not found',
    name: 'Honest Ape'
  })
})

app.get('*', (req, res) => {
  res.render('errors', {
    title: '404',
    error: '404 not found',
    name: 'jackass'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})