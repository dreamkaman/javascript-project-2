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
refs.backdropBackground.addEventListener('click', toggleModalBackdrop);
refs.openModalBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModalClose);
const filmTempate  = film => {
  console.log("ac", film);
  refs.modal.innerHTML = modalTemplate(film);
}
function toggleModalBackdrop (e) {
  if(e.target.classList.contains('backdrop')) {
    refs.backdropBackground.classList.toggle('is-hidden');
  }
}

function toggleModal() {
  refs.backdropBackground.classList.toggle('is-hidden');
  apiService.fetchFilmId(1).then(data => {
    console.log('fetchFilmId(1) - ',data)
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
    watchedBtn.addEventListener('click', () => {
      console.log('OPA!');
      if (localStorage.getItem(WATCHED_STORAGE) === idModal.textContent) {
        localStorage.setItem(WATCHED_STORAGE, '')
      }else if (localStorage.getItem(WATCHED_STORAGE) === localStorage.getItem(QUEUE_STORAGE)){
        localStorage.setItem(WATCHED_STORAGE, idModal.textContent);
        localStorage.removeItem(QUEUE_STORAGE, '');  
      }else {
      localStorage.setItem(WATCHED_STORAGE, idModal.textContent)
      }
    })
    queueBtn.addEventListener('click', () => {
      console.log('OPA!');
      if (localStorage.getItem(QUEUE_STORAGE) === idModal.textContent) {
        localStorage.setItem(QUEUE_STORAGE, '')
      } else if (localStorage.getItem(QUEUE_STORAGE) === localStorage.getItem(WATCHED_STORAGE)){
        localStorage.setItem(QUEUE_STORAGE,(localStorage.getItem(QUEUE_STORAGE) || '') + idModal.textContent);
        localStorage.setItem(WATCHED_STORAGE, '');  
      }else {
        localStorage.setItem(QUEUE_STORAGE,(localStorage.getItem(QUEUE_STORAGE) || '') + idModal.textContent);
      }
    })
  })
  console.log('active');
}

