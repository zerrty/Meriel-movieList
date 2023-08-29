export default class Api{
    // data = null;
    constructor(){
        // this.data = null;
        this.accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTk0OTdhY2YyODNkMzEwNzZhMTY3NjliNmY3ZWZjYyIsInN1YiI6IjY0ZGNhOTdkMzcxMDk3MDExYzUyMzA5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.seXMIraWOz3kqdg_EFkDb2i4LSVRX5dkzFXJjdcL_yo';
        this.headers = {"Content-Type": "application/json", "Authorization": `Bearer ${this.accessToken}`};
        this.baseUrl = 'https://api.themoviedb.org/3/';
        this.lastSearchQuerry = null;
        this.currentPage = 1;
    }
    // async fetchPopularMovies(query){
    //     try {
    //         // const res = await fetch(`${this.baseUrl}movie/popular`, {
    //         // const res = await fetch(`${this.baseUrl}${query}`, {
    //         const res = await fetch(`${this.baseUrl}search/movie?query=my star`, {
    //             method: "GET",
    //             headers: this.headers,
    //         });
    //         if(!res.ok) throw new Error('Fetch error');
    //         return await res.json();
    //         // console.log(this.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    async fetchData(query){
        try {
            const res = await fetch(`${this.baseUrl}${query}`, {
                method: "GET",
                headers: this.headers,
            });
            if(!res.ok) throw new Error('Fetch error');
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

    async renderMovie(movie){
        const postersrc = movie.poster_path == null? '' : `https://image.tmdb.org/t/p/original${movie.poster_path}`;
        return `<div class="film__container"><div class="film__poster-wrapper"> <span class="film__pg ${movie.adult? '_active' : ''}">18</span> <img class="film__poster" src="${postersrc}" alt="${movie.title} poster"> <span class="film__heart"><i class="fa-regular fa-heart"></i></span></div><div class="film__bottom-info"><h3 class="film__title">${movie.title}</h3><div class="film__additional-info"><p class="film__year">${movie.release_date}</p><p class="fiml__original-title">${movie.original_title}</p></div></div></div>`;
    }

    async renderPopularMovies(page){
        this.currentPage = page;
        const res = await this.fetchData(`movie/popular?&page=${page}`);
        const movies = res.results;
        const renderMovies = await movies.map(movie => this.renderMovie(movie));
        const rendered = await Promise.all(renderMovies);
        rendered.map((movie) => this.addToList(movie));
        const title = document.querySelector('.search-results__title');
        title.textContent = `Popular Movies`;
        // const loadMoreBtn = document.querySelector('.search-results__load-more');
        // if(res.total_pages !== res.page) loadMoreBtn.classList.add('_active');
            // else loadMoreBtn.classList.remove('_active');

    }

    async renderSearchedMovies(query, page, clearPrevious){
        this.lastSearchQuerry = query;
        const urlEncodeQuerry = encodeURIComponent(query.trim());
        const res = await this.fetchData(`search/movie?query=${urlEncodeQuerry}&page=${page}`);
        const title = document.querySelector('.search-results__title');
        const loadMoreBtn = document.querySelector('.search-results__load-more');
        const list = document.querySelector('.search-results__film-list');
        title.textContent = `Results ${res.total_results}`;
        console.log(res);
        if(res.total_results != 0){
            const movies = res.results;
            this.currentPage = page;
            if(clearPrevious) list.innerHTML = "";
            const renderMovies = await movies.map(movie => this.renderMovie(movie));
            const rendered = await Promise.all(renderMovies);
            rendered.map((movie) => this.addToList(movie));

            if(res.total_pages >= page) {
                loadMoreBtn.classList.add('_active');
            } else {
                console.log('Last page!');
                loadMoreBtn.classList.remove('_active');
            }
        } else{
            list.innerHTML = "";
            loadMoreBtn.classList.remove('_active');
        }
        
    }

    addToList = (movies) =>{
        const list = document.querySelector('.search-results__film-list');
        let li = document.createElement('li');
        li.classList.add('film');
        li.innerHTML = movies;
        // console.log(li);
        // console.log(list);
        list.append(li);
    }

    async loadNextPage(){

    }
    
}