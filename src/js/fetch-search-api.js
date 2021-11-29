const axios = require('axios').default;

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e7920edacf2615b53852bc04e3a109f1';

export default class ApiSeviseSearch {

constructor() {
    this.searchFilm = '';
    this.pages = 1;
    // this.limit = 20;
}

fetchFilmSearch = async (searchFilm) => {
    const fetch = await axios({
        url: `search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchFilm}&page=${this.pages}&include_adult=false`,
        baseURL: BASE_URL,
    }).then(response => {
        console.log(response.data)
        this.plusPage();
        this.minusPage();
        this.plusPages();
        this.minusPages();
        return response.data;  
    });
    return fetch;
}

// fetchFilmPopular = async () => {
//     const fetch = await axios({
//         url: `trending/all/week?api_key=${API_KEY}&language=en-US&page=${this.pages}`,
//         baseURL: BASE_URL,
//     }).then(response => {
//         console.log(response.data)
//         this.plusPage();
//         this.minusPage();
//         this.plusPages();
//         this.minusPages();
//         return response.data;  
//     });
//     return fetch;
// }

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

get film() {
    return this.searchName;
}

set film(newFilm) {
    this.searchFilm = newFilm;
}

}