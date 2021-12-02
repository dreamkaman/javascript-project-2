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
    
    const filmTempate  = film => {
        console.log("ac", film);
        refs.modal.innerHTML = modalTemplate(film);
    }
    function toggleModalBackdrop (event) {
      if(event.target.nodeName === "IMG") {
        refs.backdropBackground.classList.toggle('is-hidden');
      }
    }

function toggleModal(event) {
  console.log('event.target.nodeName - ', event.target.nodeName);

  if (event.target.nodeName === "IMG") {
        refs.backdropBackground.classList.toggle('is-hidden');
        apiService.fetchFilmId('566525').then(data => {
        console.log('fetchFilmId(566525) - ',data)
        filmTempate(data);
        const refs = {
          closeModalBtn: document.querySelector('.modal-close-btn'),
          backdropBackground: document.querySelector('#backdrop'),
        };
        refs.closeModalBtn.addEventListener('click', e => {
          refs.backdropBackground.classList.toggle('is-hidden');
        });  
        })
        console.log('active');
      }
        
      }

      