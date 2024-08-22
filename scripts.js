document.getElementById('query-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userInput = document.getElementById('user-input').value;
    
    if (!userInput.trim()) {
        alert("Please enter a query.");
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: userInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        document.getElementById('response-output').innerText = data.reply;
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response-output').innerText = 'An error occurred. Please try again.';
    }
});
