import ApiService from '../js/fetch-api';
import galleryCardTemplate from '../template/card.hbs';

import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-item');
const input = document.querySelector('.search-input');
let lastPage;


const apiService = new ApiService();

const changeSomeDataArr = results => {
  results.forEach(el => {
    el.genre_ids.forEach((genre, ind, arr) => {
      for (let i = 0; i < genres.length; i += 1) {
        if (genre === genres[i].id) {
          arr[ind] = genres[i].name;

          break;
        }
      }
    });

    if (el.genre_ids.length) {

      el.genre_ids = el.genre_ids.join(', ');

    } else {

      el.genre_ids = "Genres unknown";

    };

    if (el.poster_path) {
      el.poster_path = BASE_IMG_URL + el.poster_path;
    };

    if (el.release_date) {
      el.release_date = (new Date(el.release_date)).getFullYear()
    } else {
      el.release_date = "Release date unknown"
    };

  });
};

let genres = [];

apiService.fetchGenresMovie().then(data => {
  genres = data.genres;

});


const renderGalleryCard = searchName => {

  changeSomeDataArr(searchName.results);


  gallery.insertAdjacentHTML('beforeend', galleryCardTemplate(searchName.results));
};

const clearSearch = () => {
  gallery.innerHTML = '';
};



apiService.fetchFilmPopular().then(data => {


  renderGalleryCard(data);

  let pagination2 = new Pagination(document.querySelector('#pagination'), {
    totalItems: data.total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    lastItemClassName: 'last-child-tui',
    template: {
      page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
      currentPage: '<span class="current-page">{{page}}</span>',
      moveButton: ({ type }) => {
        lastPage = data.total_pages;

        let template = ' ';

        if (type === 'next') {
          template =
            '<a href="#" id="next" data-type="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
        }

        if (type === 'prev') {
          template =
            '<a href="#" data-type="prev" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
        }

        if (type === 'last') {
          template = `<a data-type="last" class="inner-page-number">${lastPage}</a>`;
        }
        if (type === 'first') {
          if (true) {
          }
          template = `<a data-type="first" class="inner-page-number">1</a>`;
        }
        return template;
      },
    },
  });
})




const searchContent = event => {
  event.preventDefault();
  clearSearch();
  const string = event.currentTarget.querySelector('.search-input').value.trim();
  if (string !== '') {
    apiService.resetPages();
    apiService.film = string;

    apiService.fetchFilmSearch()
      .then(data => {

        renderGalleryCard(data);

        apiService.setTotalRes(data.total_results);
        apiService.setTotalPages(data.total_pages);


        let pagination2 = new Pagination(document.querySelector('#pagination'), {
          totalItems: apiService.getTotalRes(), //500
          itemsPerPage: 20,
          visiblePages: 5,
          centerAlign: true,
          lastItemClassName: 'last-child-tui',
          template: {
            page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
            currentPage: '<span class="current-page">{{page}}</span>',
            moveButton: ({ type }) => {
              let lastPage = apiService.getTotalPages();
              let template = ' ';

              if (type === 'next') {
                template =
                  '<a href="#" id="next" data-type="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
              }


              if (type === 'prev') {
                template =
                  '<a href="#" data-type="prev" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
              }

              if (type === 'last') {
                template = `<a data-type="last" class="inner-page-number">${lastPage}</a>`;
              }
              if (type === 'first') {
                if (true) {
                }
                template = `<a data-type="first" class="inner-page-number">1</a>`;
              }
              return template;
            },
          },
        });

      })
      .catch(error => {

      });
  } else {
    clearSearch();
  }
};

document.querySelector('#pagination').addEventListener('click', event => {

  if (input.value !== '') {

    const tuiBtn = event.target.closest('a');
    if (tuiBtn === null || event.target.nodeName === 'SPAN') {
      return;
    }
    if (tuiBtn.dataset.type === 'next') {
      clearSearch();
      apiService.plusPage();
      apiService.fetchFilmSearch().then(data => {
        renderGalleryCard(data);
      });
      return;
    } else
      if (tuiBtn.dataset.type === 'prev') {
        clearSearch();
        apiService.minusPage();
        apiService.fetchFilmSearch().then(data => {
          renderGalleryCard(data);
        });
        return;
      }
    if (tuiBtn.dataset.type === 'last') {
      clearSearch();
      apiService.page = lastPage

      apiService.fetchFilmSearch().then(data => {

        renderGalleryCard(data);
      });
      return;
    }
    if (tuiBtn.dataset.type === 'first') {
      clearSearch();
      apiService.page = 1

      apiService.fetchFilmSearch().then(data => {

        renderGalleryCard(data);
      });
      return;
    }
    apiService.page = Number(tuiBtn.dataset.page);

    clearSearch();

    apiService.fetchFilmSearch().then(data => {
      renderGalleryCard(data);
    });
  }


  else {

    const tuiBtn = event.target.closest('a');
    if (tuiBtn === null || event.target.nodeName === 'SPAN') {
      return;
    }
    if (tuiBtn.dataset.type === 'next') {
      clearSearch();
      apiService.plusPage();
      apiService.fetchFilmPopular().then(data => {

        renderGalleryCard(data);
      });
      return;
    } else
      if (tuiBtn.dataset.type === 'prev') {
        clearSearch();
        apiService.minusPage();
        apiService.fetchFilmPopular().then(data => {

          renderGalleryCard(data);
        });
        return;
      }
    if (tuiBtn.dataset.type === 'last') {

      clearSearch();
      apiService.page = lastPage;
      apiService.fetchFilmPopular().then(data => {

        renderGalleryCard(data);
      });
      return;
    }
    if (tuiBtn.dataset.type === 'first') {
      clearSearch();
      apiService.page = 1

      apiService.fetchFilmPopular().then(data => {

        renderGalleryCard(data);
      });
      return;
    }
    apiService.page = Number(tuiBtn.dataset.page);

    clearSearch();

    apiService.fetchFilmPopular().then(data => {
      renderGalleryCard(data);
    });
  }
});



form.addEventListener('submit', searchContent);


