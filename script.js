const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');
let photosArray = [];

const count =10;
const apiKey = 'RTfGePF7jgfZpIUWNMkgzc87el0zRR6isrZE1arqkz8';

//Unspalsh API
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttribute(element, attribute) {
    for(const key in attribute) {
        element.setAttribute(key , attribute[key]);
    }
}

// Create Elemnts for links $ photos and add it to the DOM
function displayPhotos() {
    // Run function forEach elements in the photos array
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash;
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            'href' : photo.links.html,
            'target' : '_blank'
        })
        //Create img for Photos
        const img = document.createElement('img');
        setAttribute(img, {
            'src': photo.urls.regular,
            'alt' : photo.alt_description,
            'title' : photo.alt_description
        })
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.exif.make);
        // Put img inside <a> then put both inside ImageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


// Get Photos from Unsplash
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();

    }catch (error){
        // console.log(error)
    }
}

//Check if scroll is close to the bottom of the page and make request


// On Load
getPhotos();