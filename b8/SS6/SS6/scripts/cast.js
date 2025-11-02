// (async function() {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
//     }
//   };

//   async function getData() {
//     const res = await fetch('https://api.themoviedb.org/3/movie/1218925/credits?language=en-US', options);
//     if (!res.ok) {
//       throw new Error(`Request failed with status ${res.status}`);
//     }
//     const data = await res.json();
//     return data.cast || [];
//   }

//   try {
//     const data = await getData();

//     const listCast = document.getElementById("listpeople");
//     if (!listCast) return;

//     for (let i = 0; i < data.length; i++) {
//       const cast = data[i];
//       let card = document.createElement("div");
//       card.className = "movie-card";
//       const imgSrc = cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
//       card.innerHTML = `
//         <img src="${imgSrc}" alt="${cast.name}" />
//         <h3>${cast.name}</h3>        
//         <button style="font-size: 20px; padding: 10px 10px;">View Profile 👤</button>
//       `;
//       listCast.appendChild(card);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// })();
const params = new URLSearchParams(window.location.search);
let id = params.get("id");
console.log("Cast ID: " + id);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
    }
  };

async function getCastDetails(filmId) {
    const res = await fetch('https://api.themoviedb.org/3/movie/1218925/credits?language=en-US', options);
    const data = await res.json();
    return data.cast;
}
const data = await getCastDetails(id);


const listCast = document.getElementById("listpeople");


for (let i = 0; i < data.length; i++) {
      const cast = data[i];
      let card = document.createElement("div");
      card.className = "movie-card";
      const imgSrc = cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
      card.innerHTML = `
        <img class="casts-grid" src="${imgSrc}" alt="${cast.name}" />
        <h3>${cast.name}</h3>        
        <button style="font-size: 20px; padding: 10px 10px;">View Profile 👤</button>
      `;
      listCast.appendChild(card);
    }

