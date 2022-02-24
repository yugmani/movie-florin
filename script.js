const api_key = "046a7526cffd553aec9f3c6d073442a5";
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`;

const IMGPATH = "https://image.tmdb.org/t/p/w500/";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

const mainEl = document.querySelector("main");
const formEl = document.getElementById("form");
const searchEl = document.querySelector(".search");

// get the favorite movies
getMovies(APIURL);

// function to get movies list from api
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  console.log(respData);

  showMovies(respData);
  // return respData;
}

// function for movie outlay
function showMovies(movies) {
  //clear the main element initially
  mainEl.innerHTML = "";

  movies.results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    if (movie.poster_path === null) {
      poster =
        "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
    } else {
      poster = IMGPATH + movie.poster_path;
    }

    movieEl.innerHTML = `
    <img
    src="${poster}";
    alt=""
  />
  <div class="movie-info">
    <h3>${movie.title}</h3>
    <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
  </div>
  <div class="overview">
  <h4>Overview</h4>
  ${movie.overview}
  </div>
 `;

    mainEl.appendChild(movieEl);
  });
}

// function to select class based on votes
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// event listener to find the list of movies searched
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    searchEl.value = "";
  }
});
