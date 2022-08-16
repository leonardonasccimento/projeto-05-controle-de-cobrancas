const knex = require('../../db/conection');

async function editBilling(req, res) {
  const { descricao, status, valor, vencimento } = req.body;
  const { id } = req.params;

  if(!vencimento){
	  return res.status(400).json({error: 'vencimento é um campo obrigatório.'});
  }

  try {
    const customerUpdate = await knex("cobrancas")
    .where({ id })
    .first()
    .update({
        descricao,
        status,
        valor,
        vencimento,
    });

    if (!customerUpdate) {
      return res.status(404).json({ error: "Não foi possivel realizar a edição" });
    }

    return res.status(201).json({ message: "Dados atualizados com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { editBilling };
