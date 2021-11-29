
import tui from 'tui-pagination';
import Pagination from 'tui-pagination';


// const list_items = [
// 	"Item 1",
// 	"Item 2",
// 	"Item 3",
// 	"Item 4",
// 	"Item 5",
// 	"Item 6",
// 	"Item 7",
// 	"Item 8",
// 	"Item 9",
// 	"Item 10",
// 	"Item 11",
// 	"Item 12",
// 	"Item 13",
// 	"Item 14",
// 	"Item 15",
// 	"Item 16",
// 	"Item 17",
// 	"Item 18",
// 	"Item 19",
// 	"Item 20",
// 	"Item 21",
// 	"Item 22"
// ];

// const list_element = document.getElementById('list');
// const pagination_element = document.getElementById('pagination');

// let current_page = 1;
// let rows = 5;

// function DisplayList (items, wrapper, rows_per_page, page) {
// 	wrapper.innerHTML = "";
// 	page--;

// 	let start = rows_per_page * page;
// 	let end = start + rows_per_page;
// 	let paginatedItems = items.slice(start, end);

// 	for (let i = 0; i < paginatedItems.length; i++) {
// 		let item = paginatedItems[i];

// 		let item_element = document.createElement('div');
// 		item_element.classList.add('item');
// 		item_element.innerText = item;
		
// 		wrapper.appendChild(item_element);
// 	}
// }

// function SetupPagination (items, wrapper, rows_per_page) {
// 	wrapper.innerHTML = "";

// 	let page_count = Math.ceil(items.length / rows_per_page);
// 	for (let i = 1; i < page_count + 1; i++) {
// 		let btn = PaginationButton(i, items);
// 		wrapper.appendChild(btn);
// 	}
// }

// function PaginationButton (page, items) {
// 	let button = document.createElement('button');
// 	button.innerText = page;

// 	if (current_page == page) button.classList.add('active');

// 	button.addEventListener('click', function () {
// 		current_page = page;
// 		DisplayList(items, list_element, rows, current_page);

// 		let current_btn = document.querySelector('.pagenumbers button.active');
// 		current_btn.classList.remove('active');

// 		button.classList.add('active');
// 	});

// 	return button;
// }

// DisplayList(list_items, list_element, rows, current_page);
// SetupPagination(list_items, pagination_element, rows);




// const container = document.getElementById('pagination');
// const options = { // below default value of options
//      totalItems: 10,
//      itemsPerPage: 10,
//      visiblePages: 10,
//      page: 1,
//      centerAlign: false,
    //  firstItemClassName: 'tui-first-child',
    //  lastItemClassName: 'tui-last-child',
    //  template: {
    //      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    //      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    //      moveButton:
    //          '<a href="#" class="tui-page-btn tui-{{type}}">' +
    //              '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //          '</a>',
    //      disabledMoveButton:
    //          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
    //              '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //          '</span>',
    //      moreButton:
    //          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
    //              '<span class="tui-ico-ellip">...</span>' +
    //          '</a>'
    //  }
// };
// const pagination = new Pagination(container, options);

var pagination2 = new Pagination(document.querySelector('#pagination'), {
    totalItems: 500,
    itemsPerPage: 10,
    visiblePages: 5,
    centerAlign: true,
    template: {
        page: '<a href="#" ><span class="inner-page-number page">{{page}}</span></a>',
        currentPage: '<span class="page">{{page}}</span>',
        moveButton: type => {
            let template = '';
        
            if (type === 'first') {
              template =
                '<div class="custom-page-btn">' +
                  '<span class="custom-ico"></span>' +
                '</div>';
            }
        
            return template;
          },
    }
});