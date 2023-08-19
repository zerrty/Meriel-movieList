


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
window.addEventListener('resize', (evt) => {
    if(document.documentElement.clientWidth < 769){
        navigationWrapper[0].classList.remove('activeMenu');
        navigationWrapper[1].classList.add('activeMenu');
    } else{
        navigationWrapper[1].classList.remove('activeMenu');
        navigationWrapper[0].classList.add('activeMenu');
    }
});
// console.log(navigationWrapper[0], navigationWrapper[1]);
