import ApiService from '../js/fetch-api';
import galleryCardTemplate from '../template/card.hbs';

import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

const DEFAULT_IMG_PATH = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png';
const BASE_IMG_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
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
          console.log('Opa!');
          break;
        }
      }
    });
    el.genre_ids = el.genre_ids.join(', '); //Genres change

    if (el.poster_path) {
      el.poster_path = BASE_IMG_URL + el.poster_path; //Poster_path changes. Better background image.
    } else {
      el.poster_path = DEFAULT_IMG_PATH;
    }

    if (el.release_date) {
      el.release_date = new Date(el.release_date).getFullYear();
    } else {
      el.release_date = 'Release date unknown';
    } //Date change

    // el.title = String.prototype.toUpperCase(el.title);
  });
};

let genres = []; //array of genres;

apiService.fetchGenresMovie().then(data => {
  genres = data.genres;

  console.log('data.genres - 1', genres);
});

// apiService.fetchGenresTV().then(data => {

//     genres = genres.concat(data.genres);

//     console.log("data.genres - 2", genres);
// });

// console.log('const genres - ', genres);

const renderGalleryCard = searchName => {
  console.log('searchName.results - ', searchName.results);

  console.log('changeSomeDataArr - ', changeSomeDataArr(searchName.results));

  gallery.insertAdjacentHTML('beforeend', galleryCardTemplate(searchName.results));
};

const clearSearch = () => {
  gallery.innerHTML = '';
};

apiService.fetchFilmPopular().then(data => {
    renderGalleryCard(data);
    
    let pagination2 = new Pagination(document.querySelector('#pagination'), {
        totalItems: data.total_results, //500
        itemsPerPage: 20,
        visiblePages: 5,
        centerAlign: true,
        lastItemClassName: 'last-child-tui',
        template: {
          page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
          currentPage: '<span class="current-page">{{page}}</span>',
          moveButton: ({ type }) => {
            let lastPage = data.total_pages; //apiService.getTotalRes()/20;
            let template = ' ';

            if (type === 'next') {
              template =
                '<a href="#" id="next" data-type="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
            }

            //   if (type === 'first') {
            //     template =
            //       '<span>first</span>'

            //   }

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
    console.log('apiService.film) - ', apiService.film);
    apiService
      .fetchFilmSearch()
      .then(data => {
        // if (data.page === 0){
        //     clearSearch();
        //     input.classList.add(".is-hidden")
        //     form.innerHTML("beforeend", error);
        // }else {
        // clearSearch();
        console.log('apiService.fetchFilmSearch() data ', data);

        renderGalleryCard(data);
        // apiService.resetPages();

        apiService.setTotalRes(data.total_results);
        apiService.setTotalPages(data.total_pages);

        //pagination function start

        // document.querySelector('#pagination').addEventListener('click', event => {
        //   console.log(event.target);
        //   const tuiBtn = event.target.closest('a');
        //   if (tuiBtn === null || event.target.nodeName === 'SPAN') {
        //     return;
        //   }
        //   if (tuiBtn.dataset.type === 'next') {
        //     clearSearch();
        //     apiService.plusPage();
        //     apiService.fetchFilmSearch().then(data => {
        //       renderGalleryCard(data);
        //     });
        //     apiService.fetchFilmPopularPage().then(data => {
        //         renderGalleryCard(data);
        //       });
        //     return;
        //   } else 
        //   if (tuiBtn.dataset.type === 'prev') {
        //     clearSearch();
        //     apiService.minusPage();
        //     apiService.fetchFilmSearch().then(data => {
        //       renderGalleryCard(data);
        //     });
        //     apiService.fetchFilmPopularPage().then(data => {
        //         renderGalleryCard(data);
        //       });
        //     return;
        //   }          
        //   clearSearch();
        //   apiService.page = Number(tuiBtn.dataset.page);
        // //   apiService.fetchFilmPopularPage().then(data => {
        //     // renderGalleryCard(data);
        // //   });
        //   apiService.fetchFilmSearch().then(data => {
        //     renderGalleryCard(data);
        //   });
        // });
                //Pagination function start

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
              let lastPage = apiService.getTotalPages(); //apiService.getTotalRes()/20;
              let template = ' ';

              if (type === 'next') {
                template =
                  '<a href="#" id="next" data-type="next" class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></a>';
              }

              //   if (type === 'first') {
              //     template =
              //       '<span>first</span>'

              //   }

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

        //Pagination function end
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    clearSearch();
  }
};

document.querySelector('#pagination').addEventListener('click', event => {
    // ПРИ ЗАПРОССЕ РАБОТАЕТ
    if (input.value !== ''){
    console.log(event.target);
    const tuiBtn = event.target.closest('a');
    if (tuiBtn === null || event.target.nodeName === 'SPAN') {
      return;
    }
    if (tuiBtn.dataset.type === 'next') {
      clearSearch();
      apiService.plusPage();
      apiService.fetchFilmSearch().then(data => {
        //   apiService.plusPage();
          renderGalleryCard(data);
        });
      return;
    } else 
    if (tuiBtn.dataset.type === 'prev') {
      clearSearch();
      apiService.minusPage();
      apiService.fetchFilmSearch().then(data => {
        // apiService.minusPage();
          renderGalleryCard(data);
        });
      return;
    }
    if (tuiBtn.dataset.type === 'last') {
        clearSearch();
        apiService.page = apiService.getTotalPages()
      // apiService.page -= 1
        apiService.fetchFilmSearch().then(data => {
          // apiService.minusPage();
            renderGalleryCard(data);
          });
        return;
      }
      if (tuiBtn.dataset.type === 'first') {
        clearSearch();
        apiService.page = 1
      // apiService.page -= 1
        apiService.fetchFilmSearch().then(data => {
          // apiService.minusPage();
            renderGalleryCard(data);
          });
        return;
      }
    apiService.page = Number(tuiBtn.dataset.page);
    // renderGalleryCard(data);
    clearSearch();
    // apiService.fetchFilmPopularPage().then(data => {
    //   renderGalleryCard(data);
    // });
    apiService.fetchFilmSearch().then(data => {
        renderGalleryCard(data);
      });}
      // ПРИ НЕ ЗАПРОСЕ НЕ РАБОТАЕТ

      else {
        console.log(event.target);
        const tuiBtn = event.target.closest('a');
        if (tuiBtn === null || event.target.nodeName === 'SPAN') {
          return;
        }
        if (tuiBtn.dataset.type === 'next') {
          clearSearch();
          apiService.plusPage();
          apiService.fetchFilmPopular().then(data => {
            //   apiService.plusPage();
              renderGalleryCard(data);
            });
          return;
        } else 
        if (tuiBtn.dataset.type === 'prev') {
          clearSearch();
          apiService.minusPage();
          apiService.fetchFilmPopular().then(data => {
            // apiService.minusPage();
              renderGalleryCard(data);
            });
          return;
        }
        if (tuiBtn.dataset.type === 'last') {
            console.log("================================", event.target)
            clearSearch();
            apiService.page = apiService.getTotalPages()
          // apiService.page -= 1
            apiService.fetchFilmPopular().then(data => {
              // apiService.minusPage();
                renderGalleryCard(data);
              });
            return;
          }
          if (tuiBtn.dataset.type === 'first') {
            clearSearch();
            apiService.page = 1
          // apiService.page -= 1
            apiService.fetchFilmPopular().then(data => {
              // apiService.minusPage();
                renderGalleryCard(data);
              });
            return;
          }
        apiService.page = Number(tuiBtn.dataset.page);
        // renderGalleryCard(data);
        clearSearch();
        // apiService.fetchFilmPopularPage().then(data => {
        //   renderGalleryCard(data);
        // });
        apiService.fetchFilmPopular().then(data => {
            renderGalleryCard(data);
          });}
  });

// apiService.fetchGenres().then(data => {
//     console.log(data.genres.name);
// })

form.addEventListener('submit', searchContent);

// apiService.fetchFilmPopular().then(data => {
//     console.log('my data', data);

//     apiService.setTotalRes(data.total_results);
//     apiService.setTotalPages(data.total_pages);

//     console.log('apiService.getTotalRes()', apiService.getTotalRes());

//     renderGalleryCard(data);

// //pagination function start

//     pagination2 = new Pagination(document.querySelector('#pagination'), {

//     totalItems: apiService.getTotalRes(),//500
//     itemsPerPage: 20,
//     visiblePages: 8,
//     centerAlign: true,
//     lastItemClassName: 'last-child',
//     template: {

//         page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
//         currentPage: '<span class="current-page">{{page}}</span>',

//         // moreButton:
//         // '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
//         //     '<span class="tui-ico-ellip">...</span>' +
//         // '</a>',
//         moveButton: ({type}) => {

//             let lastPage = apiService.getTotalRes()/20;
//             let template = ' ';

//             if (type === 'next') {
//                 template =
//                   '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'

//               }

//             //   if (type === 'first') {
//             //     template =
//             //       '<span>first</span>'

//             //   }

//               if (type === 'prev') {
//                 template =
//                   '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'

//               }

//               if (type === 'last') {
//                 template =
//                   `<span class="inner-page-number">${lastPage}</span>`

//               }

//               if (type === 'first') {
//                   if(true){}
//                 template =
//                   `<span class="inner-page-number">1</span>`
//               }

//             return template;
//           },

//         }
//     });

// let prev = document.querySelector('.tui-prev')
// let prevprev = document.querySelector('.tui-page-btn')
// console.log(prev)
// prev.innerHTML = ''
// prevprev.innerHTML = ''

// //Pagination function end

//     // apiService.resetPages();

// });//my code

// apiService.fetchFilmPopularPage(1).then(data => {
//   console.log('my data', data);

//   apiService.setTotalRes(data.total_results);
//   apiService.setTotalPages(data.total_pages);

//   console.log('apiService.getTotalRes()', apiService.getTotalRes());

//   renderGalleryCard(data);

  //pagination function start

  // document.querySelector('#next').addEventListener('click', event=>{
  //     clearSearch();
  //     apiService.fetchFilmSearch()
  //     .then(data => {
  //         apiService.plusPage()
  //         renderGalleryCard(data);
  //     })

  // })

  //Pagination function end

  // apiService.resetPages();
// });
