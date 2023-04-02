// initialize spreadsheet data
let spreadsheetData = [
	["", "A", "B", "C", "D", "E"],
	["1", "", "", "", "", ""],
	["2", "", "", "", "", ""]
	// add more rows as needed
];

// populate spreadsheet with data
function populateSpreadsheet() {
	let spreadsheet = document.getElementById("spreadsheet");
	let tbody = spreadsheet.getElementsByTagName("tbody")[0];
	for (let i = 0; i < spreadsheetData.length; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < spreadsheetData[i].length; j++) {
			let cell = document.createElement("td");
			let input = document.createElement("input");
			input.type = "text";
			input.id = String.fromCharCode(j+65) + (i+1);
			input.value = spreadsheetData[i][j];
			input.addEventListener("input", updateSpreadsheet);
			cell.appendChild(input);
			row.appendChild(cell);
		}
		tbody.appendChild(row);
	}
}

// update spreadsheet data on input change
function updateSpreadsheet(event) {
	let cell = event.target;
	let row = cell.parentNode.parentNode.rowIndex;
	let col = cell.parentNode.cellIndex;
	spreadsheetData[row][col] = cell.value;
}

// save spreadsheet data to local storage
function saveSpreadsheet() {
	localStorage.setItem("spreadsheetData", JSON.stringify(spreadsheetData));
}

// load spreadsheet data from local storage
function loadSpreadsheet() {
	let data = localStorage.getItem("spreadsheetData");
	if (data !== null) {
		spreadsheetData = JSON.parse(data);
		populateSpreadsheet();
	}
}

// load spreadsheet on page load
window.addEventListener("load", function() {
	loadSpreadsheet();
	console.log("Spreadsheet loaded successfully!");
});

// save spreadsheet on window unload
window.addEventListener("unload", function() {
	saveSpreadsheet();
	console.log("Spreadsheet saved successfully!");
});
