const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body;
    const { usuario } = req;

    try {
       const hash = await bcrypt.hash(senha, 10);

       const editedUser = await knex("usuarios")
       .update({
           nome,
           email,
           senha: hash,
           cpf: cpf===''?null:cpf,
           telefone,
       })
       .where("id", usuario.id)
       .returning("*");

       if (editedUser.length === 0) {
         return res.status(401).json({ error: "Não foi possível realizar a edição." });
       }

       return res.status(200).json(editedUser[0]);
    } catch (error) {
       return res.status(500).json({error: error.message});
    }
}

module.exports = editUser;