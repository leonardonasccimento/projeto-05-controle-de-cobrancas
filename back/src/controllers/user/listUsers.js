const knex = require('../../db/conection');

const listUsers = async (req, res) => {

    try {
        const usersArray = await knex('usuarios');

        return res.status(200).json(usersArray);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = listUsers;

