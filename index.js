const mp3 = require('./src/mp3');
const pop = require('./data/popularity.json')

pop.forEach(element => {
    mp3.downloadOpeningsMP3(element.title)
})