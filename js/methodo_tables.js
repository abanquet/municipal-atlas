

function loadMarkdownFile(filePath, elementId) {
    fetch(filePath)
        .then(response => response.text())
        .then(markdown => {
            const converter = new showdown.Converter({ tables: true });
            const html = converter.makeHtml(markdown);
            document.getElementById(elementId).innerHTML = html;
        })
        .catch(error => console.error('Error loading Markdown file:', error));
}

// Function to read a CSV file and generate an HTML table
function loadCSVTable(fileName, containerId) {
    // Replace 'your_csv_file.csv' with the path to your CSV file
    fetch(fileName)
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n');
        const table = document.createElement('table');
  
        // Add the same inline styles to the new table
        table.setAttribute('class', 'table items-center justify-center gap-3');
        table.style.borderCollapse = 'collapse';
  
        // Create table headers
        const headerRow = document.createElement('tr');
        headerRow.style.borderBottom = '1px solid #ddd';
        const headers = rows[0].split(',');
        headers.forEach((header) => {
          const th = document.createElement('th');
          th.style.padding = '8px';
          th.style.textAlign = 'left';
          th.textContent = header;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
  
        // Create table rows
        for (let i = 1; i < rows.length; i++) {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid #ddd';
          const values = rows[i].split(',');
          values.forEach((value) => {
            const td = document.createElement('td');
            td.style.padding = '8px';
            td.style.textAlign = 'left';
            td.textContent = value;
            row.appendChild(td);
          });
          table.appendChild(row);
        }
  
        // Replace the existing table with the new table
        const csvTableContainer = document.getElementById(containerId);
        csvTableContainer.innerHTML = '';
        csvTableContainer.appendChild(table);
      });
  }
  
// Function to load an Excel file and generate an HTML table
function loadExcelTable(fileName, containerId) {
    // Replace 'your_excel_file.xlsx' with the path to your Excel file
    fetch(fileName)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
  
        const table = document.createElement('table');
  
        // Add the same inline styles to the new table
        table.setAttribute('class', 'table items-center justify-center gap-3');
        table.style.borderCollapse = 'collapse';
  
        // Create table headers
        const headerRow = document.createElement('tr');
        headerRow.style.borderBottom = '1px solid #ddd';
        const headers = Object.keys(jsonData[0]);
        headers.forEach((header) => {
          const th = document.createElement('th');
          th.style.padding = '8px';
          th.style.textAlign = 'left';
          th.textContent = header;
          headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
  
        // Create table rows
        jsonData.forEach((rowData) => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid #ddd';
          headers.forEach((header) => {
            const td = document.createElement('td');
            td.style.padding = '8px';
            td.style.textAlign = 'left';
            td.textContent = rowData[header];
            row.appendChild(td);
          });
          table.appendChild(row);
        });
  
        // Replace the existing table with the new table
        const excelTableContainer = document.getElementById(containerId);
        excelTableContainer.innerHTML = '';
        excelTableContainer.appendChild(table);
      });
  }
  
  
  

  