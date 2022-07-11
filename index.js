// GOAL: populate ARRAY with OBJECTs whose properties are pulled from the database
// append images+text content to the div based on the objects
let topContainer = document.getElementById('top-container')
let divArray = []

let exampleAPI = 'https://www.reddit.com/r/all/top.json?raw_json=1&limit=5&t=day'
// URL

const customUrl = (subreddit = 'all', sort = 'top', limit = '11', time = 'day') => {
    let fullUrl = `https://www.reddit.com/r/${subreddit}/${sort}.json?raw_json=1&limit=${limit}&t=${time}`
    return fullUrl
}

let exampleObj = {
    imgUrl: "https://i.redd.it/2a99kygeata91.jpg",
    subreddit: "r/MadeMeSmile",
    title: "This made my day",
    upvotes: 103166,
}

// function to iterate over divArray and append everything to the DOM
const showData = () => {
    divArray.forEach(obj => {
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.src = obj.imgUrl
        div.className = 'top-images'
        div.append(img)
        topContainer.append(div)
    });
}



const fetchData = (url) => {
    fetch(url)
        .then(req => req.json())
        .then(res => {
            while (divArray.length < 4) {
                for (let i = 1; i < res.data.children.length; i++) {
                    let newObj = {}
                    let nestArray = res.data.children[i].data
                    // title property - house textContent for h3 tag
                    newObj.title = nestArray.title
                    // subreddit property = house textContent for h4 tag
                    newObj.subreddit = nestArray.subreddit_name_prefixed
                    // upvotes property = house textContent for h4 tag
                    newObj.upvotes = nestArray.ups
                    // imgUrl property - house src for img tag
                    newObj.imgUrl = nestArray["thumbnail_height"] ? nestArray['url_overridden_by_dest'] : ''
                    divArray.push(newObj)
                }
            } console.log(divArray)
            showData()
        }) 
}

fetchData(exampleAPI)
