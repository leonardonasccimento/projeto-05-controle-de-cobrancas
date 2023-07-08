const knex = require('../../db/conection');

module.exports=async function verifyCpfEditUser(req, res, next) {
    const { cpf } = req.body;
    const { usuario } = req;

    if (cpf) {
        if (cpf.length < 11) {
            return res.status(400).json({ error: "CPF deve ter no mínimo 11 caracteres" });
        }

        if (cpf.length > 11) {
            return res.status(400).json({ error: "CPF deve ter no máximo 11 caracteres" });
        }
    }

    try {
        if (cpf) {
            const cpfUserFound = await knex("usuarios")
                .where("cpf", '!=', usuario.cpf)
                .andWhere({ cpf })
                .first();

            if (cpfUserFound) {
                return res.status(404).json({ error: "CPF já cadastrado" });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}