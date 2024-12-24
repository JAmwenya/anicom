// /src/utils/validators.js

// Validate if an email is in the correct format
export const validateEmail = (email) => {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		throw new Error("Invalid email format");
	}
};

// Validate if the password is at least 6 characters long
export const validatePassword = (password) => {
	if (password.length < 6) {
		throw new Error("Password must be at least 6 characters long");
	}
};

// Validate if the username is at least 3 characters long
export const validateUsername = (username) => {
	if (username.length < 3) {
		throw new Error("Username must be at least 3 characters long");
	}
};
