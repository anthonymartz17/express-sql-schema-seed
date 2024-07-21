const express = require("express");

const colors = express.Router();
const {
	getAllColors,
	getColor,
	createColor,
	deleteColor,
	updateColor,
} = require("../queries/color");
const {
	checkName,
	checkBoolean,
} = require("../validations/checkColors.validation");

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
const validations = [checkName, checkBoolean];

colors.post("/", validations, async (req, res) => {
	const newColor = await createColor(req.body);
	res.status(200).json(newColor);
});

colors.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const deletedColor = await deleteColor(id);

	if (deletedColor.id) {
		res.status(200).json(deletedColor);
	} else {
		res.status(404).json({ error: `Color with id: ${id}, not found` });
	}
});

colors.put("/:id", checkName, checkBoolean, async (req, res) => {
	const {id} =  req.params
	try {
		const updatedColor = await updateColor(id,req.body);
		res.status(200).json(updatedColor)
		
	} catch (error) {
		res.status(404).json({ error: `Color with id: ${id}, not found` })
	}
})
module.exports = colors;
