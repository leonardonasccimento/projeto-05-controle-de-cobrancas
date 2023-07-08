const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

async function signUp(req, res) {
    const { nome, email, senha } = req.body;

    try {
        const hash = await bcrypt.hash(senha, 10);
        
        const user = await knex('usuarios')
        .insert({ 
            nome, 
            email, 
            senha: hash
        })
        .returning('*');

        if (user.length===0) {
            return res.status(400).json({ error: 'Erro ao cadastrar usuário' });
        }

        return res.status(201).json(user[0]);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = signUp;
