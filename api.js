const key = '3185bd1470308a092905a22172fa3e84';

let movie = '';
let totalPages;
let dataView;
let movieDataView;

// formats movie name for the api
function searchFormatter(string){
	return string.replace(/ /g, '%20');
}

// gets the initial page and how many pages of results
// each page can have up to 20 listed movies
function getFirstPage(){
	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movie}`)
	.then(response => response.json())
    .then(function(data){
		// console.log(data.results);
		totalPages = data.total_pages;
        dataView = data;
		return data;
	})
	.then(function(data){
		createList(data);
		if(totalPages > 1){
			createPageNumbers(data);
		}
	})
	.catch(err => console.error(err));
}

// if there are more than one page of results this will get specific pages
function getSpecificPage(page){
	fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=${page}&query=${movie}&include_adult=false`)
	.then(response => response.json())
	.then(function(data){
        dataView = data
		return data;
	})
	.then(function(data){
		createList(data);
	})
	.catch(err => console.error(err));
}

function getSpecificMovieInfo(movieID){
	fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${key}&language=en-US`)
	.then(response => response.json())
	.then(function(data){
        movieDataView = data
		return data;
	})
	.then(function(data){
		// console.log(data);
		let duplicate = false;
		for(let i=0; i<moviesWatched.length; i++){
			if(moviesWatched[i].id == movieID){
				duplicate = true;
			}
		}

		if(duplicate == false){
			moviesWatched.push(data);
		}
		return duplicate;
	})
	.then(function(duplicate){
		if(duplicate == false){
			saveLocalStorage();
		}
	})
	.catch(err => console.error(err));
}