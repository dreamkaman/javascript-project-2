import ApiService from '../js/fetch-api';
import modalTemplate from '../template/modal.hbs';
const WATCHED_STORAGE = 'watched-storage';
const QUEUE_STORAGE = 'queue_storage';

const refs = {
    openModalBtn: document.querySelector('[data-card-photo]'),
    modal: document.querySelector('#modal'),
    backdropBackground: document.querySelector('#backdrop'),
};

//======================================================================================
const apiService = new ApiService();

refs.openModalBtn.addEventListener('click', toggleModal);

const filmTempate = film => {
    console.log("ac", film);
    refs.modal.innerHTML = modalTemplate(film);
};

//======================================================================================

function toggleModal(event) {

    //console.dir(event.target.dataset['card']);


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

            //Good block
            watchedBtn.addEventListener('click', () => {

                console.log('OPA!');


                if (!localStorage.getItem(WATCHED_STORAGE)) {
                    localStorage.setItem(WATCHED_STORAGE, idModal.textContent)
                }
            }
            );

            // {
            //   localStorage.setItem(WATCHED_STORAGE, idModal.textContent);
            //   localStorage.removeItem(QUEUE_STORAGE, '');  
            // } else {
            // localStorage.setItem(WATCHED_STORAGE, idModal.textContent)
            // }

            //Good block
            queueBtn.addEventListener('click', () => {
                console.log('OPA!');
                if (localStorage.getItem(QUEUE_STORAGE)) {
                    localStorage.setItem(QUEUE_STORAGE, idModal.textContent)
                }
            }
            );

        }//Api

  }//if

}

