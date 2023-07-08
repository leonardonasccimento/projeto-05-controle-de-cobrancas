const knex = require('../../db/conection');

module.exports=async function verifyEmailCustomerEdit(req, res, next) {
    const { email } = req.body;
    const { id } = req.params;

    if (!email) {
        return res.status(400).json({ error: "email é um campo obrigatório" });
    }

    try {
        const client = await knex("clientes").where('id', id).first();

        if (email !== client.email) {
            const clientEmail = await knex("clientes")
                .where("email", email)
                .first();

            if (clientEmail) {
                return res.status(400).json({ error: "E-mail já cadastrado." });
            }
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}