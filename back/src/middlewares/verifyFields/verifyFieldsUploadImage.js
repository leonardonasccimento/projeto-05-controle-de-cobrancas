const yup = require('../../utils/yup');

module.exports=async function verifyFieldsUploadImage(req, res, next) {
    const schemaCustomer = yup.object().shape({
        nome: yup.string().required(),
        imagem: yup.string().required()
    });

    try {
        await schemaCustomer.validate(req.body);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}