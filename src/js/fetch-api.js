const axios = require('axios').default;

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e7920edacf2615b53852bc04e3a109f1';

export default class ApiSeviseSearch {

constructor() {
    this.searchFilm = '';
    this.searchFilmId = '';
    this.pages = 1;
}

fetchFilmSearch = async (searchFilm) => {
    const {data} = await axios({
        url: `search/movie?api_key=${API_KEY}&language=en-US&query=${searchFilm}&page=${this.pages}&include_adult=false`,
        baseURL: BASE_URL,
    })

    console.log('data: ', data);
    // .then(response => {
    //     console.log(response.data)
    //     this.plusPage();
    //     this.minusPage();
    //     this.plusPages();
    //     this.minusPages();
    //     return response.data;  
    // });
    const {data: {genres}} = await axios({
        url: `genre/movie/list?api_key=${API_KEY}`,
        baseURL: BASE_URL,
    });

    console.log('genres: ', genres);
}   

fetchFilmId = async (filmId) => {
    const fetch = await axios({
        url: `movie/${filmId}?api_key=${API_KEY}&language=en-US`,
        baseURL: BASE_URL,
    }).then(response => {
        this.resetFilmId;
        return response.data;
    });
    return fetch;
}

fetchFilmPopular = async () => {
    // const fetch = await axios({
    //     url: `trending/all/week?api_key=${API_KEY}&language=en-US&page=${this.pages}`,
    //     baseURL: BASE_URL,
    // }).then(response => {
    //     console.log(response.data)
    //     this.plusPage();
    //     this.minusPage();
    //     this.plusPages();
    //     this.minusPages();
    //     return response.data;  
    // });
    const {data} = await axios({
        url: `trending/all/week?api_key=${API_KEY}&language=en-US&page=${this.pages}`,
        baseURL: BASE_URL,
    })

    const {data: {genres}} = await axios({
        url: `genre/movie/list?api_key=${API_KEY}`,
        baseURL: BASE_URL,
    });
    // return fetch;
}

plusPage() {
    this.pages += 1;
}

minusPage() {
    this.pages -= 1;
}

plusPages() {
    this.pages += 2;
}

minusPages() {
    this.pages -= 2;
}

resetPages(){
    this.pages = 1;
}

resetFilmId(){
    this.searchFilmId = '';
}

get film() {
    return this.searchFilm;
}

set film(newFilm) {
    this.searchFilm = newFilm;
}

get filmId() {
    return this.searchFilmId;
}

set filmId(newFilmId) {
    this.searchFilmId = newFilmId;
}

}