const knex = require('../../db/conection');
const { compareAsc } = require('date-fns');

const listCustomers = async (req, res) => {
  const {query}=req.query;

  try {
    const customers = await knex("clientes")
      .leftJoin("cobrancas", "cobrancas.cliente_id", "clientes.id")
      .whereILike('clientes.nome', `${query}%`)
      .returning("*");

    const currentDate = new Date();

    let customersArray = [];

    for (let customer of customers) {
      const customerUpdated = {
        id: customer.id,
        cliente_id: customer.cliente_id,
        nome: customer.nome,
        email: customer.email,
        telefone: customer.telefone,
        cpf: customer.cpf,
        status: customer.status==="pendente" && compareAsc(currentDate, customer.vencimento)===1? 
        "Inadimplente": 
        "Em dia",
      };

      customersArray.push(customerUpdated);
    }

    return res.status(200).json(customersArray);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { listCustomers };