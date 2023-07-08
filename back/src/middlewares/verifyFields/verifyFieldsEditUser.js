const yup = require('../../utils/yup');

module.exports= async function verifyFieldsEditUser(req, res, next) {
    const schema = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().required(),
        senha: yup.string().required(),
        cpf: yup.string().nullable(),
        telefone: yup.string().max(11).nullable()
    });

    try {
        await schema.validate(req.body);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }

    next();
}

