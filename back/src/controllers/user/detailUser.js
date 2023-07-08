const knex = require('../../db/conection');

const detailUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await knex('usuarios')
        .where('id', id)
        .first();

        if (!user) {
            return res.status(400).json({error: 'Usuário não encontrado'})
        }

        const { senha, ...userInfo } = user;

        return res.status(200).json(userInfo);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = detailUser;