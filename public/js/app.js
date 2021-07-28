const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  console.log(location)

  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        console.log(data.error)
      } else {
        messageOne.textContent = data.location
        console.log(data.location)

        const {weatherDescription, temperature, feelsLike} = data.forecast

        messageTwo.textContent = `${weatherDescription} is ${temperature} ${feelsLike}`  //Object object
        console.log(data.forecast)
      }
    })
  })
})