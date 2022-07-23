const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
let ready = false;
let imagesLoaded = 0;
let totoalImages = 0;
let photosArray = [];

const count =5;
const apiKey = 'RTfGePF7jgfZpIUWNMkgzc87el0zRR6isrZE1arqkz8';

//Unspalsh API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totoalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttribute(element, attribute) {
    for(const key in attribute) {
        element.setAttribute(key , attribute[key]);
    }
}

// Create Elemnts for links $ photos and add it to the DOM
function displayPhotos() {
    imagesLoaded =0 ;
    totoalImages = photosArray.length;
    // Run function forEach elements in the photos array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash;
        const item = document.createElement('a');
        setAttribute(item, {
            'href' : photo.links.html,
            'target' : '_blank'
        })
        const img = document.createElement('img');
        setAttribute(img, {
            'src': photo.urls.regular,
            'alt' : photo.alt_description,
            'title' : photo.alt_description
        });
        // Event Listener , check when each photo has finished loading
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


// Get Photos from Unsplash
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    }catch (error){
        console.log(error)
    }
}

//Check if scroll is close to the bottom of the page and make request
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        ready = false
        getPhotos();
    }
})


// On Load
getPhotos();