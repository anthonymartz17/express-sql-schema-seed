const db = require("../db/dbConfig");

const getAllColors = async () => {
	try {
		const allColors = await db.any("SELECT * FROM colors");

		return allColors;
	} catch (error) {
		throw error;
	}
};

const getColor = async (id) => {
	//"SELECT * FROM colors WHERE id = $1",id) $1 is a way to create a variable, pgpromise will place the value of the second argument in that variable
	try {
		const oneColor = await db.one("SELECT * FROM colors WHERE id = $1", id);
		return oneColor;
	} catch (error) {
		throw error;
	}
};

const createColor = async ({ name, is_favorite }) => {
	try {
		const newColor = db.one(
			"INSERT INTO colors (name, is_favorite) VALUES ($1,$2) RETURNING *",
			[name, is_favorite]
		);
		return newColor;
	} catch (error) {
		throw error;
	}
};
module.exports = { getAllColors, getColor, createColor };
