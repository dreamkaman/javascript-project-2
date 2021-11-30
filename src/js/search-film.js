import ApiService from '../js/fetch-api';
import galleryCardTemplate from '../template/card.hbs'

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-item');
const input = document.querySelector('.search-input');

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
    const string = event.currentTarget.querySelector('.search-input').value.trim();
    if (string !== "") {
        apiService.resetPages();
        apiService.film = string;
        console.log(apiService.film)
        apiService.fetchFilmSearch().then(data => {
            // if (data.page === 0){
            //     clearSearch();
            //     input.classList.add(".is-hidden")
            //     form.innerHTML("beforeend", error);
            // }else {
            // clearSearch();
            console.log('data ', data);

            renderGalleryCard(data);
            apiService.resetPages();
            })   
            .catch(error => {
            console.log(error)});
        }else {
            clearSearch();
        }
    }
    apiService.fetchGenres().then(data => {
        console.log(data.genres.name);
    })
    
form.addEventListener('submit', searchContent);

console.log(apiService.fetchFilmPopular());//my code