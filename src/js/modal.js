import ApiService from '../js/fetch-api';
import modalTemplate from '../template/modal.hbs';



    const refs = {
      openModalBtn: document.querySelector('[data-card-photo]'),
      closeModalBtn: document.querySelector('[data-close]'),
      modal: document.querySelector('#modal'),
    };
  
    const apiService = new ApiService();
    
    refs.openModalBtn.addEventListener('click', toggleModal);
    // refs.closeModalBtn.addEventListener('click', toggleModal);
    const filmTempate  = film => {
        console.log("ac", film);
        modal.innerHTML = modalTemplate(film);
    }
    // modal.addEventListener('click', e => {
    //     e.preventDefault();
    //     if (e.target.className !== '') {
    //         console.log("ac");
    //         return;
    //     }
      
    // });
    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
        apiService.fetchFilmId(1).then(data => {
        console.log('fetchFilmId(1) - ',data)
        filmTempate(data);
        })
        console.log('active');
      }
