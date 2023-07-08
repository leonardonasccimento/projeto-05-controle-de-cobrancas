const { compareAsc } = require('date-fns');
const knex = require('../../db/conection');

const deleteBilling = async (req, res) => {
  const { id } = req.params;

  try {
    const billing = await knex("cobrancas")
    .where("id", id)
    .first();

    if(!billing){
        return res.status(400).json({error: "Esta cobrança não existe"});
    }

    const dueDate = new Date(billing.vencimento);
    const currentDate = new Date();

    const result = compareAsc(currentDate, dueDate);

    if (billing.status !== "pendente" || result === 1) {
      return res.status(400).json({error: "Cobranças pagas ou vencidas não podem ser excluídas"});
    }

    const chargeExcluded=await knex("cobrancas")
    .where("id", id)
    .delete().
    returning("*");

    if (chargeExcluded.length===0) {
        return res.status(400).json({error: "Cobrança não pôde ser excluída"});
    }

    return res.status(200).json({message: `Cobrança de idêntificador (${id}) foi excluída com sucesso!`});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

module.exports =  deleteBilling ;