const knex = require('../../db/conection');
const { compareAsc } = require('date-fns');

const listBillings = async (req, res) => {
  const {query}=req.query;

  try {
    const billings = await knex("cobrancas")
    .whereILike('cliente', `${query}%`);

    let billingsArray = [];
    const currentDate = new Date();

    for (let billing of billings) {
      let situation = "";
      const dueDate = new Date(billing.vencimento);

      if (billing.status === "pendente") {
        const result = compareAsc(currentDate, dueDate);

        if (result === 1) {
          situation = "vencido";
        } else {
          situation = "pendente";
        }
      }

      const billingUpdated = {
        id: billing.id,
        cliente: billing.cliente,
        descricao: billing.descricao,
        valor: billing.valor,
        vencimento: billing.vencimento,
        status: billing.status === "pendente" ? situation : billing.status,
      };

      billingsArray.push(billingUpdated);
    }

    return res.status(200).json(billingsArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { listBillings };