// Get references to the DOM elements
const upperDisplay = document.getElementById("upper");
const lowerDisplay = document.getElementById("lower");
const scientificButtons = document.querySelector(".scientific__buttons");
const normalButtons = document.querySelector(".normal__buttons");
const scibutton = document.querySelector(".scientific");
const normalbutton = document.querySelector(".normal");

// Other variables
let currentCalculation = "";
let isScientific = false;

// Event listeners for switching modes
scibutton.addEventListener("click", () => {
	toggleMode(true);
});

normalbutton.addEventListener("click", () => {
	toggleMode(false);
});

document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(event) {
	const key = event.key;
	const calculatorButtons = document.querySelectorAll('input[type="button"]');
	const enterButton = document.querySelector('input[value="="]');

	calculatorButtons.forEach((button) => {
		if (button.value === key) {
			button.click();
		}
	});

	if (key === "Enter" || key === "=") {
		enterButton.click();
	}
}

// Function to toggle between normal and scientific modes
function toggleMode(scientific) {
	isScientific = scientific;
	if (isScientific) {
		normalbutton.classList.add("inactive__name");
		scibutton.classList.remove("inactive__name");
		scientificButtons.classList.remove("inactive_scientificBtns");
	} else {
		normalbutton.classList.remove("inactive__name");
		scibutton.classList.add("inactive__name");
		scientificButtons.classList.add("inactive_scientificBtns");
	}
}

// Event listeners for button clicks
scientificButtons.addEventListener("click", handleScientificClick);
normalButtons.addEventListener("click", handleNormalClick);

// Function to handle scientific button clicks
function handleScientificClick(event) {
	let target = event.target;

	if (isScientific) {
		let value = target.value;

		if (!isNaN(value) || value === ".") {
			currentCalculation += value;
		} else {
			switch (value) {
				case "Abs":
					currentCalculation = `Math.abs(${currentCalculation})`;
					break;
				case "x³":
					currentCalculation = `Math.pow(${currentCalculation}, 3)`;
					break;
				case "√":
					currentCalculation = `Math.sqrt(${currentCalculation})`;
					break;
				case "Hyp":
					currentCalculation = `Math.hypot(${currentCalculation})`;
					break;
				case "Sin":
					currentCalculation = `Math.sin(${currentCalculation})`;
					break;
				case "Cos":
					currentCalculation = `Math.cos(${currentCalculation})`;
					break;
				case "Tan":
					currentCalculation = `Math.tan(${currentCalculation})`;
					break;
				case "Log":
					currentCalculation = `Math.log10(${currentCalculation})`;
					break;
				case "Ln":
					currentCalculation = `Math.log(${currentCalculation})`;
					break;
				case "x²":
					currentCalculation = `Math.pow(${currentCalculation}, 2)`;
					break;
			}
		}

		updateDisplay();
	}
}


// Function to handle normal button clicks
function handleNormalClick(event) {
	let target = event.target;

	if (target.matches("input[type=button]")) {
		let value = target.value;
		switch (value) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case ".":
				currentCalculation += value;
				break;
			case "ANS":
				let previousAnswer = upperDisplay.value;
				currentCalculation += previousAnswer;
				break;
			case "DEL":
				currentCalculation = currentCalculation.slice(0, -1);
				break;
			case "AC":
				clearCalculator();
				break;
			case "=":
				evaluateCalculation();
				break;
			default:
				currentCalculation += value;
				break;
		}

		updateDisplay();
	}
}

// Function to update displays
function updateDisplay() {
	upperDisplay.value = currentCalculation;
}

// Function to clear the calculator
function clearCalculator() {
	currentCalculation = "";
	upperDisplay.value = "";
	lowerDisplay.value = "";
}

// Function to evaluate the calculation
function evaluateCalculation() {
	try {
		let result = eval(currentCalculation);
		if (isNaN(result) || !isFinite(result)) {
			lowerDisplay.value = "Error";
		} else {
			if (Number.isInteger(result)) {
				lowerDisplay.value = result.toFixed(0); // Show as whole number
			} else {
				lowerDisplay.value = result.toFixed(4); // Show up to 4 decimal places
			}
		}
	} catch (error) {
		lowerDisplay.value = "Error";
	}

	upperDisplay.value = "";
	currentCalculation = "";
}
