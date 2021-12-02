    
const btnLibraryWatched = document.querySelector('#home-btn');
const btnLibraryQueue = document.querySelector('#library-btn');

btnLibraryQueue.addEventListener('click', buttonLibrary);

btnLibraryWatched.addEventListener('click', buttonLibrary);
 
function buttonLibrary() {
    btnLibraryWatched.classList.toggle('active');
    btnLibraryQueue.classList.toggle('active');
    
    
}



