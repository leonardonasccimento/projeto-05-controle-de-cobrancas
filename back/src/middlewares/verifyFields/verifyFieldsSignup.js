const yup = require('../../utils/yup');

module.exports=async function verifyFieldsSignup(req, res, next) {
    const schemaSignUp = yup.object()
        .shape({
            nome: yup.string().required(),
            email: yup.string().email().required(),
            senha: yup.string().required(),
        });

    try {
        await schemaSignUp.validate(req.body);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}