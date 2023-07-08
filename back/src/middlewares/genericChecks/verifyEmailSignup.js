const knex = require('../../db/conection');

module.exports=async function verifyEmailSignup(req, res, next) {
    const { email } = req.body;

    try {
        const userInfo = await knex("usuarios").where('email', email).first();

        if (userInfo) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    next();
}