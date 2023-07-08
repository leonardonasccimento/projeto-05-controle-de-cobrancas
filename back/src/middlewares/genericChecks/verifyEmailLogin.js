const knex = require('../../db/conection');

module.exports=async function verifyEmailLogin(req, res, next) {
    const { email } = req.body;

    try {
        const user = await knex("usuarios").where("email", email).first();

        if (!user) {
            return res.status(404).json({ error: "E-mail não encontrado" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}