
import tui from 'tui-pagination';
import Pagination from 'tui-pagination';

var pagination2 = new Pagination(document.querySelector('#pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
    template: {
        page: '<a href="#" ><span class="inner-page-number page">{{page}}</span></a>',
        currentPage: '<span class="page">{{page}}</span>',
    //     moveButton: type => {
    //       let template = '';
      
    //       if (type === 'first') {
    //         template =
    //           '<div class="custom-page-btn">' +
    //             '<span class="custom-ico"></span>' +
    //           '</div>';
    //       }
    // }
}});