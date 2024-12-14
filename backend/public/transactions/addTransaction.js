document.getElementById('transactionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const currencyCode = document.getElementById('currencyCode').value;

    const token = localStorage.getItem('token'); // Assuming user authentication token is stored in localStorage

    try {
        const response = await fetch('http://localhost:5000/api/transactions/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ amount, category, date, type, description, currencyCode })
        });

        const data = await response.json();
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = data.message || 'Transaction added successfully';

        if (!response.ok) {
            messageDiv.textContent = data.message || 'Error adding transaction';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Failed to connect to the server';
    }
});
