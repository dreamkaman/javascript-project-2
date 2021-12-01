import ApiService from '../js/fetch-api';
import galleryCardTemplate from '../template/card.hbs'

const DEFAULT_IMG_PATH = "/images/svg-all/no-image.svg";
const BASE_IMG_URL = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-item');
const input = document.querySelector('.search-input');



const apiService = new ApiService();

const changeSomeDataArr = results => {
    results.forEach(el => {
        el.genre_ids.forEach((genre, ind, arr) => {
            for (let i = 0; i < genres.length; i += 1) {
                if (genre === genres[i].id) {
                    arr[ind] = genres[i].name;
                    console.log("Opa!")
                    break;
                }
            }
        });
        el.genre_ids = el.genre_ids.join(', ');//Genres change

        if (el.poster_path) {
            el.poster_path = BASE_IMG_URL + el.poster_path;//Poster_path changes. Better background image.
        } else {
            el.poster_path = DEFAULT_IMG_PATH;
        };

        if (el.release_date) { el.release_date = (new Date(el.release_date)).getFullYear() };//Date change

        // el.title = String.prototype.toUpperCase(el.title);
        
    }
        
    )
};


let genres = [];//array of genres;



apiService.fetchGenresTV().then(data => {

    genres = data.genres;

    console.log("data.genres - 1", genres);
});




apiService.fetchGenresMovie().then(data => {

    genres = genres.concat(data.genres);

    console.log("data.genres - 2", genres);
});




// console.log('const genres - ', genres);


const renderGalleryCard = searchName => {

    console.log('searchName.results - ', searchName.results);

    console.log('changeSomeDataArr - ', changeSomeDataArr(searchName.results));

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
        console.log('apiService.film) - ', apiService.film)
        apiService.fetchFilmSearch().then(data => {
            // if (data.page === 0){
            //     clearSearch();
            //     input.classList.add(".is-hidden")
            //     form.innerHTML("beforeend", error);
            // }else {
            // clearSearch();
            console.log('apiService.fetchFilmSearch() data ', data);

            renderGalleryCard(data);
            apiService.resetPages();
            })   
            .catch(error => {
            console.log(error)});
        }else {
            clearSearch();
        }
    }
    // apiService.fetchGenres().then(data => {
    //     console.log(data.genres.name);
    // })
    
form.addEventListener('submit', searchContent);

apiService.fetchFilmPopular().then(data => {
    console.log('my data.results', data.results);

    renderGalleryCard(data);
    apiService.resetPages();
    
});//my code