import { v4 as uuid } from "uuid";
import { comparePassword, hashedPassword } from "../modules/hashPassword.js";
import database from "../database/database.js";

const getUsers = async (request, response) => {
	try {
		const [rows] = await database.query("SELECT * FROM my_dashboard_db.users");
		response.status(200).json({ users: rows, length: rows.length });
	} catch (error) {
		console.error("Error fetching customers:", error);
		response.status(500).send("Server Error");
	}
};

const postUser = async (request, response) => {
	try {
		const userID = uuid();
		const user = request.body;

		if (
			!user ||
			!user.username ||
			!user.password ||
			!user.email ||
			!user.fullName
		) {
			return response
				.status(400)
				.json({ message: "Please fill all required fields." });
		}

		// Username validation (3–20 chars, letters, numbers, underscores, dots)
		const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
		if (!usernameRegex.test(user.username)) {
			return response.status(400).json({
				message:
					"Username must be 3–20 characters long and can only contain letters, numbers, underscores, and dots.",
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(user.email)) {
			return response.status(400).json({ message: "Invalid email format." });
		}

		// Password validation (8+ chars, upper, lower, number, special)
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
		if (!passwordRegex.test(user.password)) {
			return response.status(400).json({
				message:
					"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
			});
		}

		// Check if username already exists
		const [existingUser] = await database.query(
			"SELECT username FROM my_dashboard_db.users WHERE username = ?",
			[user.username]
		);

		if (existingUser.length > 0) {
			return response.status(409).json({ message: "User already exists." });
		}

		// Hash password
		const hashedPwd = await hashedPassword(user.password);

		// Insert new user
		await database.query(
			"INSERT INTO my_dashboard_db.users (userID, username, password, email, fullName) VALUES (?, ?, ?, ?, ?)",
			[userID, user.username, hashedPwd, user.email, user.fullName]
		);

		return response.status(201).json({ message: "User created", userID });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.message });
	}
};

export { postUser, getUsers };
