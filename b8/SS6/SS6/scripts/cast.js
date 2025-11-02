// This should be the complete content of your detail.js file

// --- Your Authentication Method ---
// We will use this 'options' object for all our API calls to TMDB
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        // Your bearer token is included here
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
    }
};

// This function runs as soon as the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the movie ID from the URL's query string
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        // You can fetch other movie details here first if you need to
        // For example: getMovieDetails(movieId);

        // Then, fetch and display the cast
        getMovieCast(movieId);
    } else {
        console.error('Movie ID not found in URL');
        const mainContainer = document.getElementById('main');
        mainContainer.innerHTML = '<h2>Error</h2><p>Could not find movie information because the ID is missing from the URL.</p>';
    }

    // --- All Comment Section Logic ---
    // (The comment section code from the previous response is included here)
    const commentForm = document.getElementById('comment-form');
    const commentsDisplayArea = document.getElementById('comments-display-area');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const author = document.getElementById('comment-author').value;
        const text = document.getElementById('comment-text').value;
        addCommentToDOM(author, text);
        commentForm.reset();
    });

    commentsDisplayArea.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('delete-btn')) {
            target.closest('.comment').remove();
        }

        if (target.classList.contains('edit-btn')) {
            const commentElement = target.closest('.comment');
            const commentBody = commentElement.querySelector('.comment-body');
            const currentText = commentBody.querySelector('.comment-body-text').textContent;
            commentBody.innerHTML = `<textarea class="edit-textarea">${currentText}</textarea>`;
            target.textContent = 'Save';
            target.classList.remove('edit-btn');
            target.classList.add('save-btn');
        } else if (target.classList.contains('save-btn')) {
            const commentElement = target.closest('.comment');
            const editTextArea = commentElement.querySelector('.edit-textarea');
            const updatedText = editTextArea.value;
            const commentBody = commentElement.querySelector('.comment-body');
            commentBody.innerHTML = `<p class="comment-body-text">${updatedText}</p>`;
            target.textContent = 'Edit';
            target.classList.remove('save-btn');
            target.classList.add('edit-btn');
        }
    });
});


// --- Cast Fetching and Display Function (Updated) ---
async function getMovieCast(movieId) {
    // This URL no longer has the api_key at the end
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const castGrid = document.getElementById('cast-grid');

    try {
        // We pass the API_OPTIONS object with your token to the fetch call
        const response = await fetch(API_URL, API_OPTIONS);

        if (!response.ok) {
            // If the server responds with an error (like 401 Unauthorized), this will trigger
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const cast = data.cast;

        castGrid.innerHTML = ''; // Clear previous/loading state

        if (cast.length === 0) {
             castGrid.innerHTML = '<p>No cast information available for this movie.</p>';
             return;
        }

        // Limit to the first 12 cast members
        const castToDisplay = cast.slice(0, 12);

        castToDisplay.forEach(member => {
            const castCard = document.createElement('div');
            castCard.classList.add('cast-card');

            const memberImage = member.profile_path
                ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                : './assets/default-avatar.png'; // Use a local placeholder

            castCard.innerHTML = `
                <img src="${memberImage}" alt="${member.name}">
                <p class="cast-name">${member.name}</p>
                <p class="cast-character">${member.character}</p>
            `;
            castGrid.appendChild(castCard);
        });
    } catch (error) {
        console.error('Error fetching cast:', error);
        castGrid.innerHTML = '<p style="color: red;">Could not load cast information. Please check the console for errors.</p>';
    }
}


// --- Comment Display Function ---
function addCommentToDOM(author, text) {
    const commentsDisplayArea = document.getElementById('comments-display-area');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    const timestamp = new Date().toLocaleString();
    const avatarUrl = './assets/default-avatar.png';

    commentElement.innerHTML = `
        <div class="comment-avatar">
            <img src="${avatarUrl}" alt="User Avatar">
        </div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${author}</span>
                <span class="comment-timestamp">${timestamp}</span>
            </div>
            <div class="comment-body">
                <p class="comment-body-text">${text}</p>
            </div>
            <div class="comment-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
    commentsDisplayArea.prepend(commentElement);
}