const api_key = "046a7526cffd553aec9f3c6d073442a5";
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`;

const IMGPATH = "https://image.tmdb.org/t/p/w500";
async function getMovies() {
  const resp = await fetch(APIURL);
  const respData = await resp.json();
  console.log(respData);

  respData.results.forEach((movie) => {
    const img = document.createElement("img");
    img.src = IMGPATH + movie.poster_path;
    document.body.appendChild(img);
  });

  return respData;
}

getMovies();
