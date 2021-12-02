
import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

let pagination2 = new Pagination(document.querySelector('#pagination'), {
    totalItems: 500,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
    lastItemClassName: 'last-child',
    template: {
        
        page: '<a href="#" data-page={{page}}><div class="inner-page-number">{{page}}</div></a>',
        currentPage: '<span class="current-page">{{page}}</span>',
        

        // moreButton:
        // '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        //     '<span class="tui-ico-ellip">...</span>' +
        // '</a>',
        moveButton: ({type}) => {

            let lastPage = 500/20;
            let template = ' ';

            if (type === 'next') {
                template =
                  '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              
            //   if (type === 'first') {
            //     template =
            //       '<span>first</span>'
                
            //   }

              if (type === 'prev') {
                template =
                  '<span class="arrow-btn"><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" stroke="#000" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
                
              }

              if (type === 'last') {
                template =
                  `<span class="inner-page-number">${lastPage}</span>`
                
              }



              if (type === 'first') {
                  if(true){}
                template =
                  `<span class="inner-page-number">1</span>`
              }



        
            return template;
          },

}});

let prev = document.querySelector('.tui-prev')
let prevprev = document.querySelector('.tui-page-btn')
console.log(prev)
prev.innerHTML = ''
prevprev.innerHTML = ''