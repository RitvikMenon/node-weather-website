const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6b379bbcb6203ca9d6ad0e3251b2cfb&query=' + latitude + ',' + longitude + '&units=f'
    console.log(url)
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const data = body.current
            const output = (data.weather_descriptions[0] + '. It is currently ' + data.temperature + ' degrees out. It feels like ' + data.feelslike + ' degrees out. There is a precipitation level of ' + data.precip + ' millimeters.')
            callback(undefined, output)
        }
    })
}

module.exports = forecast