document.addEventListener("DOMContentLoaded", (event) => {
	const inputs = document.querySelectorAll("input");
	const form = document.getElementById("checkout-form");

	inputs.forEach((input) => {
		input.addEventListener("change", (event) => {
			validateField(event.target);
		});
	});

	form?.addEventListener("submit", (event) => {
		event.preventDefault();
		let hasError = false;
		//Review globally if there's an error before sending the form.
		inputs.forEach((input) => {
			const error = getValidations(input);
			if (error) {
				showError(input, error);
				hasError = true;
			} else {
				input.classList.remove("is-invalid");
			}
		});
	});
});

const validateField = (element) => {
	const error = getValidations(element);

	if (error) {
		showError(element, error);
	} else {
		element.classList.remove("is-invalid");
	}
};

const getValidations = (element) => {
	const value = element.value.trim();

	if (!["fPassword", "fPhone"].includes(element.id) && value.length < 3) {
		return `Please insert at least 3 characters.`;
	}

	if (element.id === "fLastN" || element.id === "fName") {
		if (!hasOnlyLetters(value)) {
			return `Please use letters only. Numbers and special characters are not allowed.`;
		}
	}

	if (element.id === "fEmail") {
		if (!isValidEmail(value)) {
			return `Please enter a valid email address. Example: name@example.com`;
		}
	}

	if (element.id === "fPassword") {
		if (value.length < 4) {
			return `Password needs to be at least 4 characters long.`;
		}

		if (!isValidPassword(value)) {
			return `Password needs to include at least one letter and one number.`;
		}
	}

	if (element.id === "fPhone") {
		if (!isValidPhone(value)) {
			return `Invalid phone number. Must be 9 digits with no letters`;
		}
	}

	return "";
};

const hasOnlyLetters = (string) => {
	const regex = /^[A-Za-z]+$/;
	return regex.test(string);
};

const isValidEmail = (email) => {
	const regex =
		/^(?!\.)(?!.*\.\.)[a-zA-Z0-9._%+-]+(?<!\.)@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(email);
};

const isValidPassword = (password) => {
	const hasLetter = /[A-Za-z]/.test(password);
	const hasNumber = /\d/.test(password);
	return hasLetter && hasNumber;
};

const isValidPhone = (phoneNumber) => {
	return /^\d{9}$/.test(phoneNumber);
};

const showError = (element, error) => {
	const errorDiv = element.nextElementSibling;
	errorDiv.textContent = error;
	element.classList.add("is-invalid");
};
