{
    const table = document.getElementById('sortTable');
    const headers = table.querySelectorAll('th');
    const tableBody = table.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');


    // track sort directions
    const directions = [...headers].map(header => '');

    // Transform the content of given cell in given column
    const transform = (index, content) => {
        // Get the data type of column
        const type = headers[index].getAttribute('data-type');
        switch (type) {
            case 'number':
                return parseFloat(content);
                break;
            case 'string':
            default:
                return content;
        }
    };

    const sortColumn = (index) => {
        // Get the current direction
        const direction = directions[index] || 'asc';
        
        // A factor based on the direction
        const multiplier = (direction === 'asc') ? 1 : -1;

        const newRows = [...rows];

        newRows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[index].innerHTML;
            const cellB = rowB.querySelectorAll('td')[index].innerHTML;

            const a = transform(index, cellA);
            const b = transform(index, cellB);

            switch (true) {
                case a > b: return  1 * multiplier;
                case a < b: return -1 * multiplier;
                case a == b: return 0;
            }
        });

        // Remove old rows
        [...rows].forEach(row => tableBody.removeChild(row));

        // Reverse the direction
        directions[index] = direction === 'asc' ? 'desc': 'asc';

        // Append new row
        newRows.forEach(newRow => tableBody.appendChild(newRow));
    };

    [...headers].forEach((header, index) => {
        header.addEventListener('click', () => sortColumn(index));
    });
}