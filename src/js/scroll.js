import { throttle } from 'throttle-debounce';

window.addEventListener("scroll", throttle(200, function () {
    let header = document.querySelector("header");


    header.classList.toggle("sticky", window.scrollY > 125);
}));



