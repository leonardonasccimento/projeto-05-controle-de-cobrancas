const knex = require('../../db/conection');

module.exports=async function verifyCpfCustomerEdit(req, res, next) {
    const { cpf } = req.body;

    try {
        if (cpf) {
            const cpfCustomerFound = await knex("clientes").where('cpf', cpf).first();

            if (!cpfCustomerFound) {
                return res.status(401).json({ error: "Cpf ja possui cadastro para outro usuario" });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}