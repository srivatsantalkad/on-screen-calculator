function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(a, b, operator) {
	if (operator == "+") return add(a, b);
	if (operator == "-") return subtract(a, b);
	if (operator == "*") return multiply(a, b);
	if (operator == "/") return divide(a, b);
}
let prev = "";
let curr = "";
let opStore = "";

function setEventListeners() {
	const calcScreen = document.querySelector('.calculator-screen')
	const numButtons = document.querySelectorAll('.button-num');
	const opButtons = document.querySelectorAll('.button-operator');

	// Add event listener for numerical buttons.
	numButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			if (curr.length > 0 && prev.length > 0 && opStore.length == 0) {
				calcScreen.textContent = button.textContent;
				curr= "";
				prev = "";
			}
			else calcScreen.textContent += button.textContent;
			curr += button.textContent;
			console.log(curr); // debugging
		});
	});

	// Add event listeners for operational buttons.
	opButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			if (prev.length > 0 && curr.length > 0 && opStore.length == 1) {
				calcScreen.textContent = operate(Number(prev), Number(curr), opStore);
				curr = calcScreen.textContent;
				opStore = button.textContent;
			}
			if (curr.length > 0) {

				calcScreen.textContent += button.textContent;
				prev = curr;
				curr = "";
				opStore = button.textContent;

				console.log(opStore); // debugging
			}

		});
	});

	// Add event listener for the equal button.
	const equalButton = document.querySelector('.button-equal');
	equalButton.addEventListener('click', (e) => {
		if (prev.length > 0 && curr.length > 0 && opStore.length == 1) {
			calcScreen.textContent = operate(Number(prev), Number(curr), opStore);
			curr = calcScreen.textContent;
			opStore = "";
		}
	})

	// Add event listener for the AC button.
	const acButton = document.querySelector('.button-ac');
	acButton.addEventListener('click', () => {
		curr = "";
		prev = "";
		opStore = "";
		calcScreen.textContent = "";
	});

	// Add event listener for the C button.
	const cButton = document.querySelector('.button-c');
	cButton.addEventListener('click', () => {
		console.log('TEST'); // debugging

		let currLength = curr.length;
		let prevLength = prev.length;
		let opLength = opStore.length;

		console.log(`currlength : ${currLength}, prevLength: ${prevLength}, opLength: ${opLength}. `); // debugging

		if (currLength > 0 && prevLength > 0 && opLength > 0) {
			curr = curr.slice(0, -1);

		} else if (prevLength > 0 & opLength > 0) {
			opStore = opStore.slice(0, -1);
			curr = prev;
		} else if (prevLength > 0) {
			prev = prev.slice(0, -1);
		} else if (currLength > 0 && prevLength == 0) {
			curr = curr.slice(0, -1);
		}
		calcScreen.textContent = (calcScreen.textContent).slice(0, -1);
		if (calcScreen.textContent == "") {
			prev = "";
			curr = "";
			opStore = "";
		}
	});

	// Add event listener for % button.
	const percentButton = document.querySelector('.button-percent');
	percentButton.addEventListener('click', () => {
		if (curr.length > 0 && prev.length == 0) {
			curr = Number(curr)/100;
			calcScreen.textContent = curr;
		}
	});

}

setEventListeners();



