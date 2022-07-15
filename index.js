// GOAL: populate ARRAY with OBJECTs whose properties are pulled from the database
// append images+text content to the div based on the objects
const topContainer = document.getElementById('top-container')
const textBox = document.getElementById('textbox')
const sort = document.getElementById('sort')
const time = document.getElementById('time')
const submit = document.getElementById('submit')
const form = document.getElementById('form')
const formContainer = document.getElementById('form-container')
const scrollContainer = document.getElementById('scroll-container')

let divArray = []
let formObj = {}
let newArray = []
let trackedSubs = [] 
let masterTracker = []
let lastIndex = {}
let scrollArray = []

let exampleAPI = 'https://www.reddit.com/r/all/top.json?raw_json=1&limit=25&t=day'
// URL

const customUrl = (subreddit = 'all', sort = 'top', time = 'week', limit = '18') => {
    let fullUrl = `https://www.reddit.com/r/${subreddit}/${sort}.json?raw_json=1&limit=${limit}&t=${time}`
    return fullUrl
}


// function to iterate over divArray and append everything to the DOM
const showBackgrounds = async (array) => {
    let container = document.createElement('div')
    container.className = 'top-container'
    await array.forEach(obj => {
        let div = document.createElement('div')
        div.className = 'img-containers'
        let h3 = document.createElement('h3')
        h3.textContent = obj.title
        h3.className = ('subreddit-display')
        let h4 = document.createElement('h4')
        h4.textContent = obj.subreddit
        let h5 = document.createElement('h5')
        h5.textContent = obj.upvotes
        let btn = document.createElement('btn')
        btn.className = 'remove-button'
        btn.textContent = 'remove'
        // https://v https://i
        h5.className = ('div-child')
        h4.className = ('div-child')
        clickFavorite(h4)
        h3.classList.add('div-child')
        div.append(btn, h5, h4, h3)
        if (obj.imgUrl.startsWith('https://i') || obj.imgUrl == 'https://i.pinimg.com/736x/cf/76/df/cf76df177afe46ee256203db4581ef02.jpg') {
            let img = document.createElement('img')
            img.src = obj.imgUrl
            img.classList = 'top-images'
            div.style = `background-image: linear-gradient(to bottom, rgba(245, 245, 245, 0.1), rgba(25, 25, 25, 0.73)), url(${img.src}); position: relative;`
        } else {
            let vidDiv = document.createElement('div')
            vidDiv.className = 'video-div'
            let video = document.createElement('video')
            //playsinline autoplay muted loop
            let source = document.createElement('source')
            video.className = ('div-child')
            video.setAttribute('playsinline', '')
            video.setAttribute('autoplay', '')
            video.setAttribute('muted', '')
            video.setAttribute('loop', '')
            source.setAttribute('type', 'video/webm')
            source.setAttribute('src', obj.imgUrl)
            video.append(source)
            vidDiv.append(video)
            container.append(vidDiv)
        }
        container.append(div)
        // clickRemove(div)
        addRemoveButton(btn)
        scrollContainer.append(container)
    })
}




const fetchData = async (url = exampleAPI, targetArray = divArray, targetLength = 6, startIndex = 0) => {
    // console.log(url)
    let req = await fetch(url)
    let res = await req.json()
    targetArray = []
    for (let i = startIndex; targetArray.length < targetLength; i++) {
        let newObj = {}
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.children)
        // console.log(res.data.children[i])
        let nestArray = await res.data.children[i].data
        // title property - house textContent for h3 tag
        newObj.title = nestArray.title
        // subreddit property = house textContent for h4 tag
        newObj.subreddit = nestArray.subreddit_name_prefixed
        newObj.baseSubreddit = nestArray.subreddit
        if (lastIndex[nestArray.subreddit] == undefined) { // !!!!! keeps track of where next i needs to start
            lastIndex[nestArray.subreddit] = parseInt(i)
        } else lastIndex[nestArray.subreddit]++
        // upvotes property = house textContent for h4 tag
        newObj.upvotes = nestArray.ups
        // imgUrl property - house src for img tag
        newObj.imgUrl = 'https://i.pinimg.com/736x/cf/76/df/cf76df177afe46ee256203db4581ef02.jpg'
        if (nestArray['url_overridden_by_dest']) {
            if (nestArray['url_overridden_by_dest'].startsWith('https://i')) {
                newObj.imgUrl = nestArray['url_overridden_by_dest']
            } else if (nestArray['url_overridden_by_dest'].startsWith('https://v')) {
                newObj.imgUrl = nestArray['secure_media']['reddit_video']['fallback_url']
            }
        }
        targetArray.push(newObj)
    } 
    // console.log(targetArray)
    masterTracker.push(targetArray)
    showBackgrounds(targetArray)
}

// fetchData(customUrl('memes'))

const renderLoad = async () => {
    await fetchData()
    await fetchData(customUrl('aww'))
    await fetchData(customUrl('food'))
}

renderLoad()
// fetchData(customUrl('funny'))


// create a function that will take properties of exampleObj and display the title, subreddit, and upvotes over the first image in div id="top-container" 

const getInput = () => {
    formObj.subreddit = textBox.value // the input type is text so the value will be whats in the text 
    formObj.sort = sort.value // the sort valye of the select (dropdown)
    formObj.time = time.value // the time value is whatever option u click on 
}

form.addEventListener('submit', (e) => { // conditional is already referenced in eventlisteer
    e.preventDefault()
    getInput()
    textBox.value = ''
    // console.log(formObj)
    formFetch()
})

// customUrl: (subreddit = 'all', sort = 'top', time = 'day') 
// fetchData: (url = exampleAPI, targetArray = divArray, container = topContainer)
const formFetch = async (count = 6) => {
    await fetchData(customUrl(formObj.subreddit, formObj.sort, formObj.time, count), newArray, count)
}

window.addEventListener('scroll', (e) => {
    formContainer.classList.toggle('sticky', window.scrollY > 0)
})

// branch goal: add a button to each img-containing-div that lets you remove things

const addRemoveButton = (HTMLel) => {
    HTMLel.addEventListener('click', (e) => {
        if (e.target.parentElement.previousSibling) {
            if (e.target.parentElement.previousSibling.className == 'video-div') {
                e.target.parentElement.previousSibling.remove()
                e.target.parentElement.remove()
            } else e.target.parentElement.remove()
        } else e.target.parentElement.remove()
    })
}

// const showRemoveButton = (HTMLel) => {
//     HTMLel.addEventListener('mouseover', (e) => {
        
        
//     })
// }


// scroll listen
window.addEventListener('scroll', async (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // alert()
        setTimeout(await scrollFetch(), 250)
        setTimeout(await scrollFetch(), 250)    
    }
})

// thing to try:

// base new fetch request to endpoint that takes into account the indices (at least)
// pick one subreddit and paste it. eventually, keep track of what the user doesn't like
// for now just use lastIndex as crudely as possible

const randomIndex = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

let lastRandom = ''

const scrollFetch = async () => {
    let randomViewedSub = randomIndex(Object.keys(lastIndex))
    if (lastRandom == randomViewedSub) {
        // console.log(randomViewedSub)
        return
        // console.log(lastIndex[randomViewedSub])
    } 
    else {
        await fetchData(customUrl(randomViewedSub), scrollArray, 6, lastIndex[randomViewedSub])
    }
    lastRandom = randomViewedSub
}


// Make an event listener for the 'clear' button. When clicked, it should remove the contents of the scroll div

// create an array to store "favorite" subreddits. clicking on a subreddit name should add it to favorites


let button = document.getElementById('button')
button.addEventListener('click', (e) => {
    while (scrollContainer.firstChild) {
        scrollContainer.removeChild(scrollContainer.firstChild)
    }
    
})

let favSubReddits = []

const clickFavorite = (node) => {
    node.addEventListener('click',(e) => {
        if (favSubReddits.includes(node.textContent) === false) favSubReddits.push(node.textContent.replace('r/', ''))
        console.log(favSubReddits)
    })

}



// Steps: 
// record subreddit names in an array: get the ones from fetch requests (page load and form submit) and optionally let a user unfavorite a subreddit
// in the scroll listen, create a function that will do another fetch request combining some of those subreddits. Ideally, write an algorithim that will 
// encourage the user to scroll as much as possible.



// Unused -- better to use button
// const clickRemove = (HTMLel) => {
//     HTMLel.addEventListener('click', (e) => {
//         if (e.target.previousSibling) {
//             if (e.target.previousSibling.className == 'video-div') {
//                 e.target.previousSibling.remove()
//                 e.target.remove()
//             } else e.target.remove()
//         } else e.target.remove()
//     }) 
// }

