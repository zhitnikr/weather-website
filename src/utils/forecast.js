const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bad223de5d1e46e4cae2c1c88f640888&query=${lat, long}&units=f`
  request({  url, json: true  }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find weather', undefined)
    } else {
      const weatherDescription = body.current.weather_descriptions[0]
      const temperature = body.current.temperature
      const feelsLike = body.current.feelslike
      const time = body.current.observation_time
      callback(undefined, {
        weatherDescription,
        temperature,
        feelsLike,
        time
      })
    }
  })
}

module.exports = forecast