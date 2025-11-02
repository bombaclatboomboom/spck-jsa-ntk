const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiUzI1NiJ9.eyJhdWQiOiJhMDEzY2QxNTFhNjgyMWJkNjcyNGRlOTZiMGE3ZTE4MSIsIm5iZiI6MTc2MDg1OTEwNi45MzI5OTk4LCJzdWIiOiI2OGY0OTNlMmU4MTQ5MmIxYjk4ZTZmZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.AlWOy5wjqyXGOU5xh3yAWj9fovPgSYqN0_cJjclk3QI'
    }
};

// --- Main execution starts when the page is fully loaded ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page has loaded. Starting script.');
    
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // **CRITICAL CHECK 1: Do we have a Movie ID?**
    if (movieId) {
        console.log(`Movie ID found: ${movieId}. Proceeding to load data.`);
        // Ensure the comments area is ready but not cleared later
        document.getElementById('comments-display-area').innerHTML = ''; 

        getMovieCast(movieId);
        loadComments(movieId); // Load comments for this specific movie
    } else {
        console.error('CRITICAL ERROR: Movie ID not found in URL on page load.');
        document.getElementById('main').innerHTML = '<h2>Error</h2><p>Movie ID is missing.</p>';
        return; // Stop execution if there's no ID
    }

    // --- Comment Form Logic ---
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const authorInput = document.getElementById('comment-author');
        const textInput = document.getElementById('comment-text');

        if (authorInput.value.trim() === '' || textInput.value.trim() === '') return;

        const newComment = {
            author: authorInput.value,
            text: textInput.value,
            id: Date.now(),
            timestamp: new Date().toLocaleString()
        };

        addCommentToDOM(newComment); // Add visually
        saveComment(movieId, newComment); // Save to localStorage
        commentForm.reset();
    });
});


// --- Comment Management Functions ---

function getComments(movieId) {
    const commentsJSON = localStorage.getItem(`comments_${movieId}`);
    // **DIAGNOSTIC 2: Check what we are retrieving from storage.**
    console.log(`Attempting to get comments for movie ${movieId}. Raw data from localStorage:`, commentsJSON);
    
    if (!commentsJSON) {
        return []; // If nothing is there, return an empty array
    }
    try {
        return JSON.parse(commentsJSON);
    } catch (e) {
        console.error("Error parsing comments from localStorage:", e);
        return []; // If data is corrupt, return an empty array
    }
}

function saveComment(movieId, newComment) {
    const comments = getComments(movieId);
    comments.push(newComment);
    // **DIAGNOSTIC 3: Check what we are saving.**
    console.log(`Saving comments for movie ${movieId}. Data to be saved:`, comments);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
}

function updateAllComments(movieId, comments) {
    console.log(`Updating all comments for movie ${movieId}. Data:`, comments);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(comments));
}

function loadComments(movieId) {
    const comments = getComments(movieId);
    console.log(`Found ${comments.length} saved comments to load.`);

    const commentsDisplayArea = document.getElementById('comments-display-area');
    commentsDisplayArea.innerHTML = ''; // Clear the area BEFORE loading
    
    // Sort by newest first
    comments.sort((a, b) => b.id - a.id);
    
    comments.forEach(comment => {
        // **DIAGNOSTIC 4: Confirm each comment is being added.**
        console.log(`Loading comment ID ${comment.id} to the page.`);
        addCommentToDOM(comment);
    });
}

function addCommentToDOM(comment) {
    const commentsDisplayArea = document.getElementById('comments-display-area');
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.dataset.commentId = comment.id;
    
    commentElement.innerHTML = `<!-- ... your existing innerHTML for a comment ... -->`;
    // Using prepend to add new comments to the top
    commentsDisplayArea.prepend(commentElement); 
}

// --- Event Listener for Edit and Delete Actions using Event Delegation ---

document.getElementById('comments-display-area').addEventListener('click', function(event) {
    const target = event.target;
    const commentElement = target.closest('.comment');
    if (!commentElement) return;

    const commentId = Number(commentElement.dataset.commentId);
    const movieId = new URLSearchParams(window.location.search).get('id');
    let comments = getComments(movieId);
    
    // --- DELETE LOGIC ---
    if (target.classList.contains('delete-btn')) {
        // Filter out the comment with the matching ID
        const updatedComments = comments.filter(c => c.id !== commentId);
        updateAllComments(movieId, updatedComments); // Save the updated array
        commentElement.remove(); // Remove from the DOM
    }
    
    // --- EDIT/SAVE LOGIC ---
    if (target.classList.contains('edit-btn')) {
        const commentBody = commentElement.querySelector('.comment-body');
        const currentText = commentBody.querySelector('.comment-body-text').textContent;
        commentBody.innerHTML = `<textarea class="edit-textarea">${currentText}</textarea>`;
        target.textContent = 'Save';
        target.classList.add('save-btn');
        target.classList.remove('edit-btn');

    } else if (target.classList.contains('save-btn')) {
        const editTextArea = commentElement.querySelector('.edit-textarea');
        const updatedText = editTextArea.value;
        
        // Find the comment in the array and update its text
        const commentToUpdate = comments.find(c => c.id === commentId);
        if (commentToUpdate) {
            commentToUpdate.text = updatedText;
        }

        updateAllComments(movieId, comments); // Save the modified array
        
        const commentBody = commentElement.querySelector('.comment-body');
        commentBody.innerHTML = `<p class="comment-body-text">${updatedText}</p>`;
        target.textContent = 'Edit';
        target.classList.add('edit-btn');
        target.classList.remove('save-btn');
    }
});

