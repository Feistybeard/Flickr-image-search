const API_KEY = "";
const FETCH_URL = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${API_KEY}&format=json&sort=date-taken-asc&nojsoncallback=1`;
const imageListEl = document.querySelector(".images-list");
const searchInputEl = document.querySelector("#search");
const searchBtnEl = document.querySelector("#search-btn");
const overlay = document.querySelector(".overlay");
const overlayImage = overlay.querySelector("img");

async function fetchFromFlickr(query) {
  try {
    const response = await fetch(`${FETCH_URL}&text=${query}`);
    if (response.ok) {
      const data = await response.json();
      return data.photos;
    } else {
      console.log("Error on response");
    }
  } catch (e) {
    console.log(e);
  }
}

async function renderImages(imagesArr) {
  imagesArr.forEach((element) => {
    imageListEl.innerHTML += 
      `<li class='item'>
        <img src='${element}' class='img'>
        <div class="item-overlay">
          <button>View →</button>
        </div>
      </li>`;
  });
  const images = document.querySelectorAll(".item");
  images.forEach((image) => image.addEventListener("click", imgClicked));
  overlay.addEventListener("click", close);
}

function buildImagesUrl(data) {
  const images = [];
  data.photo.forEach((element) => {
    if (element.farm !== 0) {
      const imageUrl = `https://farm${element.farm}.staticflickr.com/${element.server}/${element.id}_${element.secret}.jpg`;
      images.push(imageUrl);
    }
  });

  renderImages(images);
}

function imgClicked(e) {
  const src = e.currentTarget.querySelector("img").src;
  overlayImage.src = src;
  overlay.classList.add("open");
}

function close() {
  overlay.classList.remove("open");
}

searchBtnEl.addEventListener("click", (e) => {
  const searchQuery = searchInputEl.value;
  imageListEl.innerHTML = "";
  fetchFromFlickr(searchQuery).then((data) => {
    buildImagesUrl(data);
  });
});
