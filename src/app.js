// APIs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

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
        title: 'Weather',
        name: 'Ritvik Menon'
    })
})
// route for about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ritvik Menon'
    })
})
// route for help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        followUpMessage: 'More help will be here soon!',
        title: 'Help',
        name: 'Ritvik Menon'
    })
})
// route for the weather page
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // handle user query address request, return error or send forecast
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })


        })
    })
})


// route for the products page
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})
// route for 404 help article
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritvik Menon',
        errorMessage: 'Help article not found'
    })
})
// route for 404 page not found
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ritvik Menon',
        errorMessage: 'Page not found'
    })

})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})