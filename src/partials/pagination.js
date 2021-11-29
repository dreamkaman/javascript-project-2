
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
        prev: '<svg class="icons-contacts"><use class="test href="./img/symbol-defs.svg#icon-phone-norm"></use></svg>'
}});