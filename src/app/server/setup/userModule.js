const connection = require('../commonFiles/sqlConnection');
const Joi = require('joi');



let setupModule = {}


setupModule.getUserListing = async (req, res) => {
    try {
        const data = req.query;
        const listSchema = Joi.object().keys({
            ordering: Joi.string().trim().allow(''),
            search: Joi.string().trim().allow(''),
            page: Joi.string().trim().required().messages({
                "string.empty": "Page is required"
            }),
            size: Joi.string().trim().required().messages({
                "string.empty": "Size is required"
            }),
            ci_type_id: Joi.string().trim().allow(''),
        });

        const result = await listSchema.validate(data);
        const error = result.error;
        const valid = error == null;

        if (valid) {
            const data = req.query;
            const sortType = data.ordering ? data.ordering.replace('-', '') : '';
            const searchBy = data.search ? data.search : '';
            const sortBy = data.ordering && data.ordering.indexOf('-') == 0 ? 'DESC' : 'ASC';
            let sql = `call getUserProfile(${data.page},${data.size},"${searchBy}","${sortType}","${sortBy}")`;

            connection.query(sql, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({ "err": "X", "msg": err.sqlMessage }));
                } else if (result[0][0] && result[0][0].error === "X") {
                    res.end(JSON.stringify({ "err": "X", "msg": result[0][0].message }));
                } else {
                    res.end(JSON.stringify({ "err": "", results: result[0], count: result[1][0].count }));
                }
            });
        } else {
            res.end(JSON.stringify({ "err": "X", "msg": error.message }));
        }
    } catch (error) {
        res.end(JSON.stringify({'resultCode':'0','message':"Node catch " + error}));
    }
}


setupModule.createUser = async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        const createSchema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(3).max(25).trim(true).required().messages({
                "string.empty": "first name is required",
                "string.max": "first name length must be less than or equal to 50 characters long",
                "string.min": "first name length must be more than or equal to 3 characters long"
            }),
            phoneNumber:Joi.string().optional().allow(''),

            lastName:Joi.string().allow(''),
            countryCode:Joi.string().allow(''),
            email: Joi.string().email().trim(true).required().messages({
                "string.empty":"Please enter valid email"
            }),
            role: Joi.string().allow('').min(1).max(1),
            userPassword:Joi.string().min(3).max(15).required().messages({
                "string.empty": "Password is required"
            }),

            confirmPassword:Joi.string().required().valid(Joi.ref('userPassword'))
        //     confirmPassword: Joi.any().valid(Joi.ref('userPassword')).required()
        //     .options({ language: { any: { allowOnly: 'must match password' } } })
        });
        const result = await createSchema.validate(data);

        const error = result.error;
        const valid = error == null;

        if (valid) {
            res.end({'resultCode':'1','result':result})

        }else{
            res.end(JSON.stringify({ "err": "X", "msg": error.message }));

        }

    } catch (error) {
        res.end(JSON.stringify({'resultCode':'0','message':"Node catch " + error}))
    }
}


module.exports = setupModule;