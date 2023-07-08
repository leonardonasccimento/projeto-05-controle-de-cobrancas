const knex = require('../../db/conection');

module.exports=async function verifyEmailEditUser(req, res, next) {
    const { email } = req.body;
    const { usuario } = req;

    try {
        if (email !== usuario.email) {
            const userEmail = await knex("usuarios")
                .where("email", email)
                .first();

            if (userEmail) {
                return res.status(400).json({ error: "E-mail já cadastrado." });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}