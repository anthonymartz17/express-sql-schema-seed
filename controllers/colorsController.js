const express = require("express");

const colors = express.Router();
const { getAllColors, getColor, createColor } = require("../queries/color");

colors.get("/", async (req, res) => {
	const allColors = await getAllColors();
	if (allColors[0]) {
		res.status(200).json(allColors);
	} else {
		res.status(500).json({ error: "server error" });
	}
});

colors.get("/:id", async (req, res) => {
	const { id } = req.params;
	const color = await getColor(id);
	if (color) {
		res.status(200).json(color);
	} else {
		res.status(404).json({ error: `Color with id: ${id} not found` });
	}
});

//CREATE

colors.post("/", async (req, res) => {
	const newColor = await createColor(req.body);
	res.status(200).json(newColor);
});
module.exports = colors;
