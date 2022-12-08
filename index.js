

const searchInput = document.getElementById('searchInput');
const submit = document.getElementById('submit');
let pageNumbersTop = document.getElementById('pageNumbersTop');
let pageNumbersBottom = document.getElementById('pageNumbersBottom');

let moviesWatched = [];

if(localStorage.moviesWatchedString){
	loadLocalStorage();
}

// creates list of movies
function createList(data){
	let img;
	let listContainer = document.getElementById('listContainer');
	listContainer.innerHTML = ``;
	for(let i=0; i<data.results.length; i++){
		if(data.results[i].poster_path != null){
			img = `<img src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}">`;
		}else{
			img = `<img src="images/file-image-regular-dark.png" class="white">`;
		}
		let overview = data.results[i].overview;
		listContainer.innerHTML += `
		<div id="${i}" class="listItem">
			<div class="imageContainer">
				${img}
			</div>
			<div class="listInfoContainer">
				<div class="addButton" title="Add to watched"><p>+</p></div>
				<h2>${data.results[i].title}</h2>
				<p class="overview">${overview}</p>
			</div>
		</div>
		`;
	}

	listContainer.onclick = function(event){
		// console.log(event.target.parentElement.parentElement.parentElement.id);
		// console.log(event)
		if(event.target.parentElement.classList.contains('addButton')){
			let movieID = event.target.parentElement.parentElement.parentElement.id;

			// console.log(data.results[movieID].title)
			// console.log(data.results[movieID].id)

			getSpecificMovieInfo(data.results[movieID].id);

		}
	}
}

// creates page numbers on the top & bottom of the movie list
function createPageNumbers(data){
	pageNumbersTop.innerHTML = ``;
	pageNumbersBottom.innerHTML = ``;
	if(totalPages > 1){
		for(let i=0; i<totalPages; i++){
			pageNumbersTop.innerHTML += `<span class="page${i+1}">${i+1}</span>`;
			pageNumbersBottom.innerHTML += `<span class="page${i+1}">${i+1}</span>`;
		}
	}

	pageNumbersTop.childNodes[0].classList.add('currentPage');
	pageNumbersBottom.childNodes[0].classList.add('currentPage');

	// Listens for page number clicks on top of the page
	pageNumbersTop.onclick = function(event){
		let currentPage = document.querySelectorAll('.currentPage');
		currentPage.forEach(span => {
			span.classList.remove('currentPage');
		})
		let page = event.target.innerText;
		let span = document.querySelectorAll(`.page${page}`);
		if(event.target.nodeName == 'SPAN'){
			getSpecificPage(page);
			span.forEach(page => {
				page.classList.add('currentPage');
			})
		}
	}
	// Listens for page number clicks on bottom of the page
	pageNumbersBottom.onclick = function(event){
		let currentPage = document.querySelectorAll('.currentPage');
		currentPage.forEach(span => {
			span.classList.remove('currentPage');
		})
		let page = event.target.innerText;
		let span = document.querySelectorAll(`.page${page}`);
		if(event.target.nodeName == 'SPAN'){
			getSpecificPage(page);
			span.forEach(page => {
				page.classList.add('currentPage');
			})
			window.scrollTo(0, 0);
		}
	}
}

function saveLocalStorage() {
	if(moviesWatched.length > 0){
		let moviesWatchedString = JSON.stringify(moviesWatched);
		// console.log(moviesWatchedString);
		localStorage.setItem('moviesWatchedString', moviesWatchedString);
	}
	
}

function loadLocalStorage() {
	if(localStorage.moviesWatchedString.length > 0){
		// console.log(JSON.parse(localStorage.moviesWatchedString));
		moviesWatched = JSON.parse(localStorage.moviesWatchedString);
	}
}

if(submit){
	submit.onclick = function(){
		movie = searchFormatter(searchInput.value);
		getFirstPage()
	}
}

// listens for 'enter' on the keyboard and submits the search
if(searchInput){
	searchInput.onkeydown = function(event){
		if(event.code === 'Enter'){
			submit.click();
		}
	}
}