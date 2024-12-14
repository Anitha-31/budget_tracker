document.getElementById('addBudgetForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const monthlyBudget = document.getElementById('monthlyBudget').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:5000/api/budget/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ category, monthlyBudget })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('responseMessage').textContent = data.message || 'Error adding budget';
            return;
        }

        document.getElementById('responseMessage').textContent = 'Budget added successfully!';
        document.getElementById('addBudgetForm').reset();
    } catch (error) {
        document.getElementById('responseMessage').textContent = 'Failed to connect to the server';
    }
});
