import ApiService from '../js/fetch-api';
import modalTemplate from '../template/modal.hbs';
import Notiflix from 'notiflix';
export const WATCHED_STORAGE = 'watched_storage';
const QUEUE_STORAGE = 'queue_storage';

const NotiflixSettings = { fontSize: '20px', width: '500px' };

let idCloseModal;
let idEscapeKeydown;
let idAddWaatched;
let idAddQueue;



const refs = {
  openModalBtn: document.querySelector('[data-card-photo]'),
  modal: document.querySelector('#modal'),
  backdropBackground: document.querySelector('#backdrop'),
};

const apiService = new ApiService();


refs.openModalBtn.addEventListener('click', toggleModal);

const filmTempate = film => {
  refs.modal.innerHTML = modalTemplate(film);
};



function toggleModal(event) {


  console.dir(event.target.dataset['card']);


  if (event.target.className === "card-img" || event.target.className === "card-no-image") {

    const id = event.target.dataset['card'];

    refs.backdropBackground.classList.remove('is-hidden');

    apiService.fetchFilmId(id).then(data => {

      filmTempate(data);

      const refs = {
        closeModalBtn: document.querySelector('.modal-close-btn'),
        backdropBackground: document.querySelector('#backdrop'),
      };


      idCloseModal = refs.closeModalBtn.addEventListener('click', (e) => {
        refs.backdropBackground.classList.add('is-hidden');

        document.removeEventListener("keydown", idEscapeKeydown);
        watchedBtn.removeEventListener('click', idAddWaatched);
        queueBtn.removeEventListener('click', idAddQueue);


      }, { once: true });

      const watchedBtn = document.querySelector('.js-watched');
      const queueBtn = document.querySelector('.js-queue');

      const idModal = document.querySelector('#js-id');
      const imgModal = document.querySelector('.modal-img');
      const titleEl = document.querySelector('.modal-title');
      const genresLiEl = document.querySelector('.js-genres');
      const realeseDateEl = document.querySelector('.js-year');
      const ratingSpanEl = document.querySelector('.modal-rating-film');

      idEscapeKeydown = document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          refs.backdropBackground.classList.add('is-hidden');

          watchedBtn.removeEventListener('click', idAddWaatched);
          queueBtn.removeEventListener('click', idAddQueue);
        };

      }, { once: true }
      );


      idAddWaatched = watchedBtn.addEventListener('click', () => {
        let localStorageArr = [];

        let myRealeseYear;

        try {
          myRealeseYear = (new Date(realeseDateEl.textContent)).getFullYear();
        } catch (error) {

        };

        if (!myRealeseYear) { myRealeseYear = "Realese year unknown" };

        let myUrlImage;

        if (imgModal) {
          myUrlImage = imgModal.currentSrc
        } else {
          myUrlImage = '';
        };

        console.dir(genresLiEl.textContent);

        const myFilm = {
          id: idModal.textContent,
          urlImage: myUrlImage,
          title: titleEl.textContent,
          genres: genresLiEl.textContent,
          realeseDate: myRealeseYear,
          rating: ratingSpanEl.textContent,
        };

        if (!localStorage.getItem(WATCHED_STORAGE)) {
          localStorageArr.push(myFilm);
          localStorage.setItem(WATCHED_STORAGE, JSON.stringify(localStorageArr));
        } else if (localStorage.getItem(WATCHED_STORAGE).includes(JSON.stringify(myFilm))) {
          Notiflix.Notify.failure('Watched film list includes this film!', NotiflixSettings)

        } else {

          localStorageArr = JSON.parse(localStorage.getItem(WATCHED_STORAGE));

          localStorageArr.push(myFilm);

          localStorage.setItem(WATCHED_STORAGE, JSON.stringify(localStorageArr));

        };

      })


      idAddQueue = queueBtn.addEventListener('click', () => {
        let localStorageArr = [];

        let myRealeseYear;

        try {
          myRealeseYear = (new Date(realeseDateEl.textContent)).getFullYear();
        } catch (error) {

        };

        if (!myRealeseYear) { myRealeseYear = "Realese year unknown" };

        let myUrlImage;

        if (imgModal) {
          myUrlImage = imgModal.currentSrc
        } else {
          myUrlImage = '../images/No_image_poster.png'
        };

        const myFilm = {
          id: idModal.textContent,
          urlImage: myUrlImage,
          title: titleEl.textContent,
          genres: genresLiEl.textContent,
          realeseDate: myRealeseYear,
          rating: ratingSpanEl.textContent,
        };



        if (!localStorage.getItem(QUEUE_STORAGE)) {
          localStorageArr.push(myFilm);
          localStorage.setItem(QUEUE_STORAGE, JSON.stringify(localStorageArr));
        } else if (localStorage.getItem(QUEUE_STORAGE).includes(JSON.stringify(myFilm))) {
          Notiflix.Notify.failure('Queue of the films includes this film!', NotiflixSettings)

        } else {

          localStorageArr = JSON.parse(localStorage.getItem(QUEUE_STORAGE));

          localStorageArr.push(myFilm);

          localStorage.setItem(QUEUE_STORAGE, JSON.stringify(localStorageArr));

        };
      })
    })

  }
}