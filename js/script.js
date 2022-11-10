const API_KEY = ""
const FETCH_URL = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&format=json&sort=date-taken-asc&per_page=20&nojsoncallback=1`
const imageListEl = document.querySelector('.images-list')
const searchInputEl = document.querySelector('#search')
const searchBtnEl = document.querySelector('#search-btn')

async function fetchFromFlickr(query) {
    try {
        const response = await fetch(`${FETCH_URL}&text=${query}`)
        if (response.ok) {
            const data = await response.json()
            return data.photos.photo;
        } else {
            console.log('Error on response');
        }
    } catch (e) {
        console.log(e);
    }
}

async function renderImages(imagesArr) {
    imagesArr.forEach(element => {
        imageListEl.innerHTML += `<li><img src='${element}'></li>`
    })
} 

function buildImagesUrl(data) {
    const images = []
    data.forEach(element => {
        const imageUrl = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`
        images.push(imageUrl)
    });

    renderImages(images)
}

searchBtnEl.addEventListener('click', e => {
    const searchQuery = searchInputEl.value
    imageListEl.innerHTML = ''
    fetchFromFlickr(searchQuery).then(data => {
        buildImagesUrl(data)
    })
})