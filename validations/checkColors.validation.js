const checkName = (req, res, next) => {
	if (req.body.name) {
		return next();
	} else {
		//400 error for BAD REQUEST
		res.status(400).json({ error: "Name is required" });
	}
};

const checkBoolean = (req, res, next) => {
	const { is_favorite } = req.body;
	// account if string or undefined
	// the value false will evaluate to false
	// therefore check if typeof is boolean as well
	if (
		is_favorite == "true" ||
		is_favorite == "false" ||
		is_favorite == undefined ||
		typeof is_favorite == "boolean"
	) {
		next();
	} else {
		res.status(400).json({ error: "is_favorite must be a boolean value" });
	}
};
module.exports = { checkName, checkBoolean };
