import ApiService from '../js/fetch-api';
import modalTemplate from '../template/modal.hbs';



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
        })
        console.log('active');
      }

     
      