import ApiService from './js/fetch-search-api.js';
import galleryCardTemplate from './template/card.hbs'

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btn = {
    Next: document.querySelector('.btn-next'),
    Nexts: document.querySelector('.btn-next2'),
    Back: document.querySelector('.btn-back'),
    Backs: document.querySelector('.btn-back2')
}

const apiService = new ApiService();

const renderGalleryCard = searchName => {
    gallery.insertAdjacentHTML('beforeend', galleryCardTemplate(searchName.results));
};

const clearSearch = () => {
    gallery.innerHTML = '';
}

const searchContent = event => {
    event.preventDefault();
    clearSearch();
    const string = event.currentTarget.querySelector('.input-search').value.trim();
    if (string !== "") {
        apiService.resetPages();
        apiService.name = string;
        console.log(apiService.name)
        apiService.fetchFilmSearch().then(data => {
            if (data.totalHits === 0){
                clearSearch();
                const error = "<p>Search result not successful. Enter the correct movie name and</p>";
                form.innerHTML("beforeend", error);
            }else {
            clearSearch();
            renderGalleryCard(data);
            apiService.resetPages();
            }})   
            .catch(error => {
            console.log(error)});
    }else {
        clearSearch();
    }
}

form.addEventListener('submit', searchContent)