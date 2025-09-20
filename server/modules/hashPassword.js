import bcrypt from "bcrypt";

const saltRounds = 10;

const hashedPassword = async (password) => {
	return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPwd) => {
	return await bcrypt.compare(password, hashedPwd);
};

export { hashedPassword, comparePassword };
