


// search button
const searchIcon = document.querySelector('.header__search-icon');
const searchContainer = document.querySelector('.header__search-form');
const clear = document.querySelector('.clear');
const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
// Замніити на взаємодію з формор.


searchForm.addEventListener('submit', (evt) =>{
    evt.preventDefault();
    // search functionality
});

searchIcon.addEventListener('click', (evt) =>{
    searchContainer.classList.toggle('active');
});

clear.addEventListener('click', (evt) =>{
    searchInput.value = '';
})



// add navigation from header to burger-navigation window
const navigationWrapper = document.querySelectorAll('.header__navigation-list');
document.addEventListener("DOMContentLoaded", (evt) =>{
    if(document.documentElement.clientWidth < 769){
        navigationWrapper[0].classList.remove('_active');
    } else{
        navigationWrapper[1].classList.remove('_active');
        navigationWrapper[0].classList.add('_active');
    }
});

window.addEventListener('resize', (evt) =>{
    if(document.documentElement.clientWidth < 769){
        navigationWrapper[0].classList.remove('_active');
    } else{
        navigationWrapper[1].classList.remove('_active');
        navigationWrapper[0].classList.add('_active');
    }
});
// console.log(navigationWrapper[0], navigationWrapper[1]);


// burger button
const burgerBtn = document.querySelector('.header__burger');
if(burgerBtn){
    const menuBody = document.querySelector('.menu');
    const milkShadow = document.querySelector('.milk-shadow');

    burgerBtn.addEventListener('click', (evt) =>{
        burgerBtn.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        milkShadow.classList.toggle('_active');
        document.body.classList.toggle('_lock');
        navigationWrapper[1].classList.toggle('_active');
    })
}