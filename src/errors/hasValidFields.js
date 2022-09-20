const validFields = new Set([
    "score",
    "content",
])

function hasValidFields(req, res, next){
    const { data = {} } = req.body;

    const invalidFields = Object.keys(data).filter((field)=> !validFields.has(field));

    if(invalidFields.length){
        return next({
            status: 400,
            message: `Invalid field(s):  ${invalidFields.join(",")}`
        });
    }
    next();
}

module.exports = hasValidFields;