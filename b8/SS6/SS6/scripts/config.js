const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
  }
};

async function getData() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
    const data = await res.json();
    return data.results;
}
const data = await getData();

const listFilms = document.getElementById("listfilm");
for (let i = 0; i < data.length; i++) {
    const film = (data[i]);
    let card = document.createElement("div");
    card.className = ".movie-card";
    card.innerHTML = `
        <a href="detail.html?id=${film.id}"> 
        <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}" />
        <h3>${film.title}</h3>        
        <button style="font-size: 20px; padding: 10px 10px;">Watch Now 🎥</button>
        </a>
    `;
    listFilms.appendChild(card);
}
getData();




