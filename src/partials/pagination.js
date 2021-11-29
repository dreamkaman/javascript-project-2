
import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

var pagination2 = new Pagination(document.querySelector('#pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
    template: {
        page: '<a href="#" ><div class="inner-page-number">{{page}}</div></a>',
        currentPage: '<span class="page">{{page}}</span>',
        moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
            '<span class="tui-ico-ellip">...</span>' +
        '</a>',
        moreButton: type => {
            let template = '<span>...</span>';
        
            if (type === 'previous  ') {
                template =
                  '<div class="custom-page-btn">' +
                    '<span class="custom-ico"></span>' +
                  '</div>';
              }
        
            return template;
          },

}});

let prev = document.querySelector('.tui-prev')
let prevprev = document.querySelector('.tui-page-btn')
console.log(prev)
prev.innerHTML = ''
prevprev.innerHTML = ''