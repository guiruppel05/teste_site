document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let feedbackText = document.getElementById('feedback').value;
    if (feedbackText.trim() === '') return;

    let feedbackMessages = document.getElementById('feedback-messages');
    let newFeedback = document.createElement('p');
    newFeedback.textContent = feedbackText;
    
    feedbackMessages.appendChild(newFeedback);
    
    document.getElementById('feedback').value = '';
});



