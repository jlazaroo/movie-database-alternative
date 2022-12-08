
movieListButton = document.getElementById('movieListButton');
movieListContainer = document.getElementById('movieListContainer');

movieListContainer.innerHTML = "";
moviesWatched.forEach(createMoviesList);


movieListButton.onclick = function(){
    movieListContainer.innerHTML = "";
    moviesWatched.forEach(createMoviesList);
}

function createMoviesList(movie){
    let img;
    if(movie.poster_path != null){
        img = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" title="${movie.title}">`;
    }else{
        img = `<img src="images/file-image-regular-dark.png" class="white">`;
    }

    movieListContainer.innerHTML += `
        <div class="movie" id="${movie.id}">
            ${img}<div class="movieInfo hide"></div>
        </div>
    `;
    console.log(movie.title)
}

movieListContainer.onclick = function(event){
    if(event.target.nodeName == 'IMG'){
        let id = event.target.parentElement.id;
        console.log(id);
    }
}