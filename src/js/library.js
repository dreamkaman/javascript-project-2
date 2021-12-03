import ApiService from '../js/fetch-api';
import myLibraryTemplate from '../template/mylibrary.hbs';
//import WATCHED_STORAGE from '../js/modal';

const btnLibraryWatched = document.querySelector('#home-btn');
const btnLibraryQueue = document.querySelector('#library-btn');
const gallery = document.querySelector('.filmoteka-gallery');


btnLibraryQueue.addEventListener('click', onBtnLibraryQueueClick);

btnLibraryWatched.addEventListener('click', onBtnLibraryWatchedClick);

function onBtnLibraryQueueClick() {
    btnLibraryWatched.classList.remove('active');
    btnLibraryQueue.classList.add('active');

    gallery.innerHTML = '';

    gallery.insertAdjacentHTML('beforeend', myLibraryTemplate(JSON.parse(localStorage.getItem('queue_storage'))));
};

function onBtnLibraryWatchedClick() {
    btnLibraryWatched.classList.add('active');
    btnLibraryQueue.classList.remove('active');

    gallery.innerHTML = '';

    gallery.insertAdjacentHTML('beforeend', myLibraryTemplate(JSON.parse(localStorage.getItem('watched_storage'))));
};


gallery.innerHTML = '';

gallery.insertAdjacentHTML('beforeend', myLibraryTemplate(JSON.parse(localStorage.getItem('watched_storage'))));



