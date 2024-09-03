document.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('authenticated')) {
        window.location.href = '/login.html';
    } else {
        fetchData();
    }

    document.getElementById('logout-button').addEventListener('click', function () {
        localStorage.removeItem('authenticated');
        window.location.href = '/login.html';
    });
});
document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(error => console.error('Error fetching data:', error));
}

function populateTable(data) {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.classList.add('text-gray-700');

        const tagCell = document.createElement('td');
        tagCell.classList.add('w-1/4', 'py-3', 'px-4');
        tagCell.textContent = item.tag;

        const patternsCell = document.createElement('td');
        patternsCell.classList.add('w-1/4', 'py-3', 'px-4');
        patternsCell.textContent = item.patterns.join(', ');

        const responsesCell = document.createElement('td');
        responsesCell.classList.add('w-1/3', 'py-3', 'px-4');
        responsesCell.textContent = item.responses.join(', ');

        const actionsCell = document.createElement('td');
        actionsCell.classList.add('w-1/6', 'py-3', 'px-4', 'text-center');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded');
        deleteButton.addEventListener('click', () => deleteRecord(index));
        actionsCell.appendChild(deleteButton);

        row.appendChild(tagCell);
        row.appendChild(patternsCell);
        row.appendChild(responsesCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

// Handle form submission for adding a new record
document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const tag = document.getElementById('new-tag').value.trim();
    const patterns = document.getElementById('new-patterns').value.trim().split(',').map(pattern => pattern.trim());
    const responses = document.getElementById('new-responses').value.trim().split(',').map(response => response.trim());

    if (tag && patterns.length > 0 && responses.length > 0) {
        addNewRecord({ tag, patterns, responses });
        document.getElementById('add-form').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

function addNewRecord(newRecord) {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.push(newRecord);
            saveData(data);
        })
        .catch(error => console.error('Error adding new record:', error));
}

function deleteRecord(index) {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            data.splice(index, 1);
            saveData(data);
        })
        .catch(error => console.error('Error deleting record:', error));
}

function saveData(data) {
    fetch('/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.message);
        alert(result.message);
        fetchData();  // Refresh the table after saving
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving data.');
    });
}
