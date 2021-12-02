import { Console, log } from 'console';
import { async } from 'fast-glob';

import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

const axios = require('axios').default;

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'e7920edacf2615b53852bc04e3a109f1';

export default class ApiService {
  constructor() {
    this.searchFilm = '';
    this.searchFilmId = '';
    this.pages = 1;
    this.totalResults = 0;
    this.totalPages = 0;
  }

  fetchFilmSearch = async searchFilm => {
    const fetch = await axios({
      url: `search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchFilm}&page=${this.pages}&include_adult=false`,
      baseURL: BASE_URL,
    }).then(response => {
      console.log('fetchFilmSearch - ', response.data);
      this.plusPage();
      this.minusPage();
      return response.data;
    });

    return fetch;
  };

  fetchGenresTV = async () => {
    return await axios({
      url: `genre/tv/list?api_key=${API_KEY}&language=en-US`,
      baseURL: BASE_URL,
    }).then(response => {
      return response.data;
    });
  };

  fetchGenresMovie = async () => {
    return await axios({
      url: `genre/movie/list?api_key=${API_KEY}&language=en-US`,
      baseURL: BASE_URL,
    }).then(response => {
      return response.data;
    });
  };

  fetchFilmId = async filmId => {
    const fetch = await axios({
      url: `movie/512195?api_key=${API_KEY}&language=en-US`,
      baseURL: BASE_URL,
    }).then(response => {
      this.resetFilmId;
      return response.data;
    });
    return fetch;
  };

//   fetchFilmPopularPage = async currentPage => {
//     const fetch = await axios({
//       url: `trending/movie/week?api_key=${API_KEY}&language=en-US&page=${this.pages}`,
//       baseURL: BASE_URL,
//     }).then(response => {
//       this.plusPage();
//       this.minusPage();

//       console.log('fetchFilmPopularPage - response -', response);

//       return response.data;
//     });

//     return fetch;
//   };

  fetchFilmPopular = async () => {
    const fetch = await axios({
        
      url: `trending/movie/week?api_key=${API_KEY}&page=${this.pages}`,
      baseURL: BASE_URL,
    }).then(response => {
      console.log('fetchFilmPopular - response -', response);

      return response.data;
    });

    return fetch;
  };

  plusPage() {
      if(this.pages !== this.totalPages){
    this.pages += 1;}
  }

  minusPage() {
      if(this.pages > 1){
    this.pages -= 1;
}
  }

  resetPages() {
    this.pages = 1;
  }

  resetFilmId() {
    this.searchFilmId = '';
  }

  setTotalRes(newTotalResults) {
    return (this.totalResults = newTotalResults);
  }

  getTotalRes() {
    return this.totalResults;
  }

  setTotalPages(newTotalPages) {
    return (this.totalPages = newTotalPages);
  }

  getTotalPages() {
    return this.totalPages;
  }

  get film() {
    return this.searchFilm;
  }

  set film(newFilm) {
    this.searchFilm = newFilm;
  }

  get page() {
    return this.pages;
  }

  set page(newPage) {
    this.pages = newPage;
  }

  get filmId() {
    return this.searchFilmId;
  }

  set filmId(newFilmId) {
    this.searchFilmId = newFilmId;
  }
}
