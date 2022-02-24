const api_key = "046a7526cffd553aec9f3c6d073442a5";
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`;

const IMGPATH = "https://image.tmdb.org/t/p/w500/";
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=`;

const mainEl = document.querySelector("main");
const formEl = document.getElementById("form");
const searchEl = document.querySelector(".search");
// get the favorite movies
getMovies();

async function getMovies() {
  const resp = await fetch(APIURL);
  const respData = await resp.json();
  console.log(respData);

  respData.results.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img
    src="${IMGPATH}${movie.poster_path}";
    alt=""
  />
  <div class="movie-info">
    <h3>${movie.title}</h3>
    <span class="${getClassByRate(movie.vote_average)}">${
      movie.vote_average
    }</span>
  </div>
 `;

    mainEl.appendChild(movieEl);
  });

  return respData;
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value;
});
