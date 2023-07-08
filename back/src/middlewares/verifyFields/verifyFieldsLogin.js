const yup = require('../../utils/yup');

module.exports=async function verifyFieldsLogin(req, res, next) {
    const schemaLogin = yup.object().shape({
        email: yup.string().email().required(),
        senha: yup.string().required()
    });

    try {
        await schemaLogin.validate(req.body);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}