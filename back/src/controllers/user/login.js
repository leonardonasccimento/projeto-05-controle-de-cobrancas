const knex = require('../../db/conection');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await knex('usuarios').where('email', email).first();

        const token = jwt.sign({ id: user.id }, process.env.DATABASE_HASH, { expiresIn: '365d' });

        const { senha: _, ...userInformation } = user;

        return res.status(200).json({
            usuario: userInformation,
            token
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = login;