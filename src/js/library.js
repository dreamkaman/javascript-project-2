import ApiService from '../js/fetch-api';
import myLibraryTemplate from '../template/mylibrary.hbs';
//import WATCHED_STORAGE from '../js/modal';

const btnLibraryWatched = document.querySelector('#home-btn');
const btnLibraryQueue = document.querySelector('#library-btn');
const gallery = document.querySelector('.gallery');

btnLibraryQueue.addEventListener('click', buttonLibrary);

btnLibraryWatched.addEventListener('click', buttonLibrary);

function buttonLibrary() {
    btnLibraryWatched.classList.toggle('active');
    btnLibraryQueue.classList.toggle('active');
};

gallery.innerHTML = '';

gallery.insertAdjacentHTML('beforeend', myLibraryTemplate(JSON.parse(localStorage.getItem('watched-storage'))));



