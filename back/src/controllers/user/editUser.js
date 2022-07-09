const knex = require('../../db/conection');
const bcrypt = require('bcrypt');

const editUser = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body;
    const { usuario } = req;

    try {
      const user = await knex("usuarios")
      .where("id", usuario.id)
      .first();

       const hash = await bcrypt.hash(senha, 10);

       const editedUser = await knex("usuarios")
       .update({
           nome,
           email,
           senha: hash,
           cpf,
           telefone,
       })
       .where("id", usuario.id)
       .returning("*");

       if (editedUser.length === 0) {
         return res.status(401).json({ error: "Não foi possível realizar a edição." });
       }

       return res.status(200).json(editedUser[0]);
    } catch (error) {
       return res.status(500).json(error.message);
    }
}

module.exports = { editUser };