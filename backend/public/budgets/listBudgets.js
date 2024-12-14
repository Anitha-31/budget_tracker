document.addEventListener('DOMContentLoaded', async () => {
    const budgetsDiv = document.getElementById('budgets');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:5000/api/budget/list', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            budgetsDiv.textContent = data.message || 'Error fetching budgets';
            return;
        }

        renderBudgetsTable(data.budgets);
    } catch (error) {
        budgetsDiv.textContent = 'Failed to connect to the server';
    }
});

const renderBudgetsTable = (budgets) => {
    const budgetsDiv = document.getElementById('budgets');
    //budgetsDiv.innerHTML = '<h2>Budgets</h2>';
    const table = document.createElement('table');
    table.border = "1";

    // Table headers
    const headers = ['Category', 'Monthly Budget', 'Spent', 'Remaining'];
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    budgets.forEach(budget => {
        const row = document.createElement('tr');
        const cells = [
            budget.category,
            budget.monthly_budget,
            budget.spent,
            budget.monthly_budget - budget.spent
        ];
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    budgetsDiv.appendChild(table);
};
