document.getElementById('fetchCategoryReport').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:5000/api/report/category', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Error fetching category report');
            return;
        }

        const labels = data.spendingByCategory.map(item => item.category);
        const values = data.spendingByCategory.map(item => item.total_spent);

        renderChart('categoryChart', labels, values, 'Spending by Category');
    } catch (error) {
        alert('Failed to connect to the server');
    }
});

document.getElementById('monthlyReportForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    try {
        const response = await fetch(`http://localhost:5000/api/report/monthly?month=${month}&year=${year}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Error fetching monthly report');
            return;
        }

        const labels = data.monthlySpending.map(item => item.category);
        const values = data.monthlySpending.map(item => item.total_spent);

        renderChart('monthlyChart', labels, values, `Spending for ${month}/${year}`);
    } catch (error) {
        alert('Failed to connect to the server');
    }
});

const renderChart = (canvasId, labels, values, title) => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount Spent',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                title: { display: true, text: title },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
};
