console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = 'Loading in some Javascript right here.'
messageTwo.textContent = 'The site is under daily revisions. Thanks for your patience and support!'





weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value


    messageOne.textContent = 'Gimme a sec, gimme a sec...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })

})