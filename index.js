// GOAL: populate ARRAY with OBJECTs whose properties are pulled from the database
// append images+text content to the div based on the objects
const topContainer = document.getElementById('top-container')
const bodyContainer = document.getElementById('body-container')
const textBox = document.getElementById('textbox')
const sort = document.getElementById('sort')
const time = document.getElementById('time')
const submit = document.getElementById('submit')
const form = document.getElementById('form')

let divArray = []
let formObj = {}
let newArray = []

let exampleAPI = 'https://www.reddit.com/r/all/top.json?raw_json=1&limit=25&t=day'
// URL

const customUrl = (subreddit = 'all', sort = 'top', time = 'day', limit = '4') => {
    let fullUrl = `https://www.reddit.com/r/${subreddit}/${sort}.json?raw_json=1&limit=${limit}&t=${time}`
    return fullUrl
}


// function to iterate over divArray and append everything to the DOM
const showBackgrounds = (array, container) => {
    array.forEach(obj => {
        let div = document.createElement('div')
        div.className = 'img-containers'
        let h3 = document.createElement('h3')
        h3.textContent = obj.title
        let h4 = document.createElement('h4')
        h4.textContent = obj.subreddit
        let h5 = document.createElement('h5')
        h5.textContent = obj.upvotes
        // https://v https://i
        div.append(h3, h4, h5)
        if (obj.imgUrl.startsWith('https://i') || obj.imgUrl == 'https://i.pinimg.com/736x/cf/76/df/cf76df177afe46ee256203db4581ef02.jpg') {
            let img = document.createElement('img')
            img.src = obj.imgUrl
            img.classList = 'top-images'
            div.style = `background-image: linear-gradient(to bottom, rgba(245, 245, 245, 0.1), rgba(25, 25, 25, 0.73)), url(${img.src}); position: relative;`
        } else {
            let vidDiv = document.createElement('div')
            vidDiv.id = 'video-div'
            let video = document.createElement('video')
            //playsinline autoplay muted loop
            let source = document.createElement('source')
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
    });
}


const fetchData = async (url = exampleAPI, targetArray = divArray, container = topContainer, targetLength = 4) => {
    let req = await fetch(url)
    let res = await req.json()
    targetArray = []
    for (let i = 1; i < res.data.children.length && targetArray.length < targetLength; i++) {
        let newObj = {}
        let nestArray = res.data.children[i].data
        // title property - house textContent for h3 tag
        newObj.title = nestArray.title
        // subreddit property = house textContent for h4 tag
        newObj.subreddit = nestArray.subreddit_name_prefixed
        // upvotes property = house textContent for h4 tag
        newObj.upvotes = nestArray.ups
        // imgUrl property - house src for img tag
        newObj.imgUrl = 'https://i.pinimg.com/736x/cf/76/df/cf76df177afe46ee256203db4581ef02.jpg'
        if (nestArray['url_overridden_by_dest'].startsWith('https://i')) {
            newObj.imgUrl = nestArray['url_overridden_by_dest']
        } else if (nestArray['url_overridden_by_dest'].startsWith('https://v')) {
            newObj.imgUrl = nestArray['secure_media']['reddit_video']['fallback_url']
        }
        targetArray.push(newObj)
    } console.log(targetArray)
    showBackgrounds(targetArray, container)
}

fetchData()
// create a function that will take properties of exampleObj and display the title, subreddit, and upvotes over the first image in div id="top-container" 
let exampleObj = {
    imgUrl: "https://i.redd.it/2a99kygeata91.jpg",
    subreddit: "r/MadeMeSmile",
    title: "This made my day",
    upvotes: 103166,
}

const getInput = () => {
    formObj.subreddit = textBox.value // the input type is text so the value will be whats in the text 
    formObj.sort = sort.value // the sort valye of the select (dropdown)
    formObj.time = time.value // the time value is whatever option u click on 
}


form.addEventListener('submit', (e) => { // conditional is already referenced in eventlisteer
    e.preventDefault()
    getInput()
    textBox.value = ''
    console.log(formObj)
    formFetch()
})

// customUrl: (subreddit = 'all', sort = 'top', time = 'day') 
// fetchData: (url = exampleAPI, targetArray = divArray, container = topContainer)
const formFetch = async (count = 28) => {
    await fetchData(customUrl(formObj.subreddit, formObj.sort, formObj.time, count), newArray, bodyContainer, count)
}



// NEXT STEPS:

// USE VALUES FROM FORM TO INVOKE fetch

