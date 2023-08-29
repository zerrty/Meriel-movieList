import Api from './modules/Api.js';
const API = new Api();

async function loadMovie(){
    await API.renderPopularMovies();
}

async function loadSearchResults(query){
    await API.renderSearchedMovies(query, 1, true);
}


// Search
const searchContainer = document.querySelector('.header__search-form');
const clear = document.querySelector('.clear');
const searchInput = document.querySelector('.header__search-input');
const searchForm = document.querySelector('.header__search-form');
const loadMoreBtn = document.querySelector('.search-results__load-more');

// Замніити на взаємодію з формор.


searchForm.addEventListener('submit', async (evt) =>{
    evt.preventDefault();
    if(evt.target.classList.contains('active') && evt.target.searchField.value.length !=0){
        const query = evt.target.searchField.value;
        evt.target.searchField.value = '';
        // loadSearchResults(query);
        await API.renderSearchedMovies(query, 1, true);
    }
    searchContainer.classList.toggle('active');
    
    
    // loadMoreBtn.addEventListener('click', (evt) => {
    //     API.renderSearchedMovies
    // });
});




// searchIcon.addEventListener('click', (evt) =>{
//     searchContainer.classList.toggle('active');
// });

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

    API.renderPopularMovies(1);
    
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


// load more button
loadMoreBtn.addEventListener('click', (evt) => {
    // API.renderSearchedMovies(API.lastQuerry ,API.currentPage+1, false);
    console.log(API.lastSearchQuerry);
    API.renderSearchedMovies(API.lastSearchQuerry ,API.currentPage+1, false);

})