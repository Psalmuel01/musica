const music = new Audio("music/5.mp3")

// create Array

const songs = [
    {
        id: "1",
        songName: `<p>God Girl Playlist</p>
                    <p class="small mb-3 mb-lg-0">Sean swadder</p>`,
        poster: "images/img1.svg"
    },
    {
        id: "2",
        songName: `<p>Reggae “n” blues</p>
                    <p class="small mb-3 mb-lg-0">Dj YK Mule</p>`,
        poster: "images/img2.svg"
    },
    {
        id: "3",
        songName: `<p>Tomorrow’s tunes</p>
                    <p class="small mb-3 mb-lg-0">Obi Datti</p>`,
        poster: "images/img3.svg"
    },
    {
        id: "4",
        songName: `<p class="mt-3">In the Light</p>
                    <p class="small">Johnny Drille ft. Ayra Starr</p>`,
        poster: "images/img4.svg"
    },
    {
        id: "5",
        songName: `<p class="mt-3">You're Only Single</p>
                    <p class="small">Johnny Drille</p>`,
        poster: "images/img5.svg"
    },
    {
        id: "6",
        songName: `<p class="mt-3">Birthday Girl</p>
                    <p class="small">Jeff Annie</p>`,
        poster: "images/img6.svg"
    },
    {
        id: "7",
        songName: `<p class="mt-3">Beautiful Day</p>
                    <p class="small">Jamie Grace</p>`,
        poster: "images/img7.svg"
    },
    {
        id: "8",
        songName: `<p class="mt-3">Bad Dancer</p>
                    <p class="small">Johnny Drille</p>`,
        poster: "images/img8.svg"
    },
    {
        id: "9",
        songName: `<p class="mt-3">Never Enough</p>
                    <p class="small">Unknown</p>`,
        poster: "images/img9.svg"
    },
    {
        id: "10",
        songName: `<p class="mt-3">Awesome God</p>
                    <p class="small">A Week Away</p>`,
        poster: "images/img10.svg"
    },
    {
        id: "11",
        songName: `<p class="mt-3">Amazing Grace</p>
                    <p class="small">Lawrence Oyor</p>`,
        poster: "images/img11.svg"
    },
    {
        id: "12",
        songName: `<p class="mt-3">He Knows My Name</p>
                    <p class="small">Hillsong Worship</p>`,
        poster: "images/img12.svg"
    },
    {
        id: "13",
        songName: `<p class="mt-3">I Bring The Light</p>
                    <p class="small">Joe Praize</p>`,
        poster: "images/img13.svg"
    },
    {
        id: "14",
        songName: `<p class="mt-3">Excess Love</p>
                    <p class="small">Mercy Chinwo</p>`,
        poster: "images/img14.svg"
    },
    {
        id: "15",
        songName: `<p class="mt-3">Trust in You</p>
                    <p class="small">Lauren Daigle</p>`,
        poster: "images/img15.svg"
    }
]

// or charts-list

Array.from(document.getElementsByClassName("song-list")).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster
    // console.log(element.getElementsByTagName("img")[0]);
    element.getElementsByTagName("div")[0].innerHTML = songs[i].songName
})

const play = document.querySelector("#play")

play.addEventListener("click", () => {
    if (music.paused || music.currentTime <= 0) {
        music.play()
        play.classList.remove("fa-circle-play")
        play.classList.add("fa-circle-pause")
    } else {
        music.pause()
        play.classList.add("fa-circle-play")
        play.classList.remove("fa-circle-pause")
    }
    music.addEventListener("ended", () => {
            play.classList.add("fa-circle-play")
            play.classList.remove("fa-circle-pause")
        })
})

let index = 0
let poster = document.getElementById("poster")
let title = document.getElementById("title")

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName("charts-list")).forEach((element) => {
        element.style.background = "#1A1E1F"
    })
}

Array.from(document.getElementsByClassName("play-list")).forEach((element) => { //from here 1
    element.addEventListener("click", (e) => {
        index = element.id;
        // console.log(index);
        music.src = `music/${index}.mp3`
        poster.src = `images/img${index}.svg`
        music.play()
        title.innerHTML = songs[index-1].songName
        // let songTitle = songs.filter((ele) => {
        //     return ele.id == index
        // })
        // songTitle.forEach(ele => {
        //     let {songName} = ele
        //     title.innerHTML = songName
        // })
        play.classList.remove("fa-circle-play")
        play.classList.add("fa-circle-pause")
        music.addEventListener("ended", () => {
            play.classList.add("fa-circle-play")
            play.classList.remove("fa-circle-pause")
        })
        makeAllBackgrounds()
        Array.from(document.getElementsByClassName("charts-list"))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    })
})

let currentStart = document.getElementById("currentStart")
let currentEnd = document.getElementById("currentEnd")
let seek = document.getElementById("seek")

music.addEventListener("timeupdate", ()=>{
    let musicCurr = music.currentTime
    let musicDur = music.duration

    let min = Math.floor(musicDur/60)
    let sec = Math.floor(musicDur%60)
    // sec < 10 ? `0${sec}` : `${sec}`
    if (sec < 10) {
        sec = `0${sec}`
    }
    currentEnd.innerHTML = `${min}:${sec}`

    let mins = Math.floor(musicCurr/60)
    let secs = Math.floor(musicCurr%60)
    if (secs < 10) {
        secs = `0${secs}`
    }
    currentStart.innerHTML = `${mins}:${secs}`

    let progressBar = parseInt((music.currentTime/music.duration)*100)
    seek.value = progressBar
})

seek.addEventListener("change", ()=>{
    music.currentTime = seek.value * music.duration/100
    // console.log(music.currentTime);
})

music.addEventListener("ended", ()=>{
    play.classList.add("fa-circle-play")
    play.classList.remove("fa-circle-pause")
})



let vol = document.getElementById("vol")

vol.addEventListener("change", ()=>{
    
    let volLevel = vol.value
    music.volume = volLevel/100
    // console.log(music.volume);
})

let back = document.getElementById("back")
let next = document.getElementById("next")

back.addEventListener("click", ()=>{
    index -= 1
    if (index < 1) {
        index = Array.from(document.getElementsByClassName("song-list")).length
    }
    music.src = `music/${index}.mp3`
    poster.src = `images/img${index}.svg`
    music.play()
    title.innerHTML = songs[index-1].songName
    
    makeAllBackgrounds()
    Array.from(document.getElementsByClassName("charts-list"))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
})

next.addEventListener("click", ()=>{
    index -= 0
    index += 1
    console.log(index);
    if (index > Array.from(document.getElementsByClassName("song-list")).length) {
        console.log(index);
        index = 1
    }
    music.src = `music/${index}.mp3`
    poster.src = `images/img${index}.svg`
    music.play()
    title.innerHTML = songs[index-1].songName
    
    makeAllBackgrounds()
    Array.from(document.getElementsByClassName("charts-list"))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
})



