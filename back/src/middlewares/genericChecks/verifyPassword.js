const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

module.exports=async function verifyPassword(req, res, next) {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'email é um campo obrigatório.' });
    }

    if (!senha) {
        return res.status(400).json({ error: 'senha é um campo obrigatório.' });
    }

    try {
        const user = await knex("usuarios")
            .where("email", email)
            .first();

        const bcryptPassword = await bcrypt.compare(senha, user.senha);

        if (!bcryptPassword) {
            return res.status(400).json({ error: "Email e senha não confere" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}