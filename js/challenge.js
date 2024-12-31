document.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    let isPaused = false;
    const timerElement = document.getElementById('counter');
    const incrementButton = document.getElementById('plus');
    const decrementButton = document.getElementById('minus');
    const likeButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentList = document.getElementById('list');
    const likes = {};

    function updateTimer() {
        timerElement.textContent = count;
    }

    function increment() {
        if (!isPaused) {
            count += 1;
            updateTimer();
        }
    }

    function decrement() {
        if (!isPaused) {
            count -= 1;
            updateTimer();
        }
    }

    function addLike() {
        if (likes[count]) {
            likes[count] += 1;
        } else {
            likes[count] = 1;
        }
        updateLikesCounts();
    }

    function updateLikesCounts() {
        likesList.innerHTML = Object.entries(likes)
            .map(([number, likeCount]) => `<li>Number ${number}: ${likeCount} like${likeCount > 1 ? 's' : ''}</li>`)
            .join('');
    }

    function togglePause() {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'resume' : 'pause';
    }

    function addComment(event) {
        event.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText !== '') {
            const commentElement = document.createElement('p');
            commentElement.textContent = commentText;
            commentList.appendChild(commentElement);
            commentInput.value = '';
        }
    }

    // Set interval for counter increment
    const intervalId = setInterval(() => {
        if (!isPaused) {
            increment();
        }
    }, 1000);

    // Event listeners
    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    likeButton.addEventListener('click', addLike);
    pauseButton.addEventListener('click', togglePause);
    commentForm.addEventListener('submit', addComment);
});

