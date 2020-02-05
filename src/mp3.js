const pop = require('../data/popularity.json')
const fetch = require('node-fetch')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

async function getOpeningURL(animeName){
    const response = await fetch("https://openings.ninja/api/anime/" + animeName).catch((e) => console.log(e))
    data = await response.json()
    links = []
    data.openings.forEach(element => {
        links.push(element.links[0])
    })
    return links 
}

//getOpeningURL("Kill La Kill").then(data => {console.log(data)})

async function getMP3(openingURL){
    title = openingURL.substring(30, openingURL.length-5)
    try{
        await ffmpeg(openingURL)
            .output('./mp3/' + title + '.mp3')
            .on('end', () => {
                console.log(`downloaded ${title}`)
            })
            .on('error', (err) => {
                console.log(err)
            }).run()
        
    } catch(e) {
        console.log(e)
    }
}

//getMP3("https://animethemes.moe/video/KillLaKill-OP1.webm")

async function downloadOpeningsMP3(animeName){
    links = await getOpeningURL(animeName)
    links.forEach(element => {
        getMP3(element)
    })
}

module.exports = {
    downloadOpeningsMP3
}

//downloadOpeningsMP3("Kill La Kill")