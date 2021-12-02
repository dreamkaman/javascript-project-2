import ApiService from '../js/fetch-api';
import modalTemplate from '../template/modal.hbs';
const WATCHED_STORAGE = 'watched-storage';
const QUEUE_STORAGE = 'queue_storage';

const refs = {
  openModalBtn: document.querySelector('[data-card-photo]'),
  modal: document.querySelector('#modal'),
  backdropBackground: document.querySelector('#backdrop'),
};

const apiService = new ApiService();

// refs.backdropBackground.addEventListener('click', toggleModalBackdrop);

refs.openModalBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModalClose);

const filmTempate = film => {
  console.log("ac", film);
  refs.modal.innerHTML = modalTemplate(film);
};

// function toggleModalBackdrop(event) {

//   if (event.target.nodeName === "IMG") {

//     refs.backdropBackground.classList.toggle('is-hidden');
//   }
// };

function toggleModal(event) {

  //console.dir(event.target.className);

  //console.log('event.target',event.target);

  console.dir(event.target.dataset['card']);


  if (event.target.className === "card-img" || event.target.className === "card-no-image") {

    const id = event.target.dataset['card'];

    refs.backdropBackground.classList.toggle('is-hidden');

    apiService.fetchFilmId(id).then(data => {

      filmTempate(data);

      const refs = {
        closeModalBtn: document.querySelector('.modal-close-btn'),
        backdropBackground: document.querySelector('#backdrop'),
      };
      refs.closeModalBtn.addEventListener('click', (e) => {
        refs.backdropBackground.classList.toggle('is-hidden');
      });

      const watchedBtn = document.querySelector('.js-watched');
      const queueBtn = document.querySelector('.js-queue');

      const idModal = document.querySelector('#js-id');
      const imgModal = document.querySelector('.modal-img');
      const titleEl = document.querySelector('.modal-title');
      const genresLiEl = document.querySelector('.js-genres');
      const realeseDateEl = document.querySelector('.js-year');
      const ratingSpanEl = document.querySelector('.modal-rating-film');



      watchedBtn.addEventListener('click', () => {
        let myRealeseYear;// = "Realese year unknown";

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

        console.log(myFilm);

        if (!localStorage.getItem(WATCHED_STORAGE)) {
          localStorage.setItem(WATCHED_STORAGE, JSON.stringify(myFilm));
        } else if (localStorage.getItem(WATCHED_STORAGE).includes(JSON.stringify(myFilm))) {
          alert("Watched film list includes this film!");
        } else {
          localStorage.setItem(WATCHED_STORAGE, idModal.textContent);
        };



        ;
        //console.log(typeof (idModal.textContent));

        //localStorage.setItem(WATCHED_STORAGE, idModal.textContent);
        // } else if (localStorage.getItem(WATCHED_STORAGE) === localStorage.getItem(QUEUE_STORAGE)) {
        //   localStorage.setItem(WATCHED_STORAGE, idModal.textContent);
        //   localStorage.removeItem(QUEUE_STORAGE, '');
        // } else {
        //   localStorage.setItem(WATCHED_STORAGE, idModal.textContent)
        // }
      })
      queueBtn.addEventListener('click', () => {
        console.log('OPA!');
        if (localStorage.getItem(QUEUE_STORAGE) === idModal.textContent) {
          localStorage.setItem(QUEUE_STORAGE, '')
        } else if (localStorage.getItem(QUEUE_STORAGE) === localStorage.getItem(WATCHED_STORAGE)) {
          localStorage.setItem(QUEUE_STORAGE, (localStorage.getItem(QUEUE_STORAGE) || '') + idModal.textContent);
          localStorage.setItem(WATCHED_STORAGE, '');
        } else {
          localStorage.setItem(QUEUE_STORAGE, (localStorage.getItem(QUEUE_STORAGE) || '') + idModal.textContent);
        }
      })
    })
    console.log('active');
  }
}