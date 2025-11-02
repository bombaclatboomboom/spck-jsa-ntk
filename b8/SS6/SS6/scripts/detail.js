const params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log("Film ID: " + id);


const option = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
  }
};

async function getFilmDetails(filmId) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, option);
    const data = await res.json();
    return data;
}
const data = await getFilmDetails(id);


const filmDetail = document.getElementById("main");

const posterUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` :null;
const posterHtml = posterUrl
    ? `<a href="${posterUrl}"><img src="${posterUrl}"></a>`
    : `<a href="#">No Image</a>`;

filmDetail.innerHTML = `
    <div class="detail-card">
        <div class="poster" img src="${posterUrl}" style="max-width:200px>${posterHtml}</div>
        <div class="detail-info">
            <div class="title-row">
                <h1 class="title">${data.title}</h1>
                
                <div class="meta">
                    <span>${data.release_date}</span>
                    <span>•</span>
                    <span>${(data.vote_average)} / 10</span>
                </div>
            </div>
            <h3 class="tagline" style="color:red">"${data.tagline}"</h2>            
            <p class="synopsis">${data.overview }</p>    
            <p class="genres"><strong>🎬 Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>        
            <p class="runtime"><strong>⌛ Runtime:</strong> ${data.runtime} minutes</p>
            <p class="release_date"><strong>📅 Release Date:</strong> ${data.release_date}</p>
            <div class="actions">
                <button class="btn primary">Watch Now 🎥</button>
                <button class="btn secondary" onclick="window.location.href='cast.html?id=${data.id}'">View Cast 👤</button>
                <button class="btn secondary" onclick="window.location.href='index.html'">Back to Home 🏠</button>
            </div>
        </div>
    </div>
`;



