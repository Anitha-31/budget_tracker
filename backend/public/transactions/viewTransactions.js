const token = localStorage.getItem('token');
const transactionsDiv = document.getElementById('transactions');

// Function to fetch and display transactions
const fetchTransactions = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            transactionsDiv.textContent = data.message || 'Error fetching transactions';
            return;
        }

        renderTransactionsTable(data.transactions);
    } catch (error) {
        transactionsDiv.textContent = 'Failed to connect to the server';
    }
};

// Function to render transactions in a table
const renderTransactionsTable = (transactions) => {
    transactionsDiv.innerHTML = '<h2>Transactions</h2>';
    const table = document.createElement('table');
    table.border = "1";

    // Table headers
    const headers = ['Date', 'Type', 'Amount', 'Category', 'Description'];
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
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        const cells = [
            transaction.date,
            transaction.type,
            transaction.amount,
            transaction.category,
            transaction.description || 'N/A'
        ];
        cells.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    transactionsDiv.appendChild(table);
};

// Fetch and display latest transactions on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchTransactions('http://localhost:5000/api/transactions/list');
});

// Handle filtering with form submission
document.getElementById('filterForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const url = `http://localhost:5000/api/transactions/list?start_date=${startDate}&end_date=${endDate}`;
    fetchTransactions(url);
});
