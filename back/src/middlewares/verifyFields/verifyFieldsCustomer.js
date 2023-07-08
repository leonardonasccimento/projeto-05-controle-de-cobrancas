const yup = require('../../utils/yup');

module.exports=async function verifyFieldsCustomer(req, res, next) {
    const schemaCustomer = yup.object().shape({
        nome: yup.string().required(),
        email: yup.string().email().required(),
        cpf: yup.string().min(11).max(11).required(),
        telefone: yup.string().max(11).required(),
        cep: yup.string().max(8),
        logradouro: yup.string(),
        complemento: yup.string(),
        bairro: yup.string(),
        cidade: yup.string(),
        estado: yup.string()
    });

    try {
        await schemaCustomer.validate(req.body);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}