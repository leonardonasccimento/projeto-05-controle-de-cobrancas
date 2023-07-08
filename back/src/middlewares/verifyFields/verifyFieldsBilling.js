const yup = require('../../utils/yup');

module.exports= async function verifyFieldsBilling(req, res, next) {
    const schema = yup.object().shape({
        descricao: yup.string(),
        status: yup.string().required(),
        valor: yup.number().required(),
        // vencimento: yup.date().required()
    });

    try {
        await schema.validate(req.body);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}