const knex = require('../../db/conection');

const registerBilling = async (req, res) => {
    const { id } = req.params;
    const { descricao, status, valor, vencimento } = req.body;

    if (status !== 'pago' && status !== 'pendente') {
        return res.status(400).json({error: "Status deve ser apenas pago ou pendente"});
    }

    if(!vencimento){
      return res.status(400).json({error: "vencimento é um campo obrigatório."});
    }

    if(vencimento.length>10){
      return res.status(400).json({error: "A data deve ter o máximo de 10 caracteres"});
    }
    
    let dateISO;
    if(vencimento.includes('/')){
      dateISO = new Date(vencimento.split('/').reverse().join('/'));
    }else{
      dateISO=vencimento;
    }
    
    try {
        const customer = await knex("clientes").where("cpf", id).first();

        if (!customer) {
          return res.status(404).json({ error: "Cliente não encontrado. Cobrança deve ser cadastrada pelo CPF." });
        }

        const billing = await knex("cobrancas")
          .insert({
            cliente: customer.nome,
            descricao,
            status,
            valor,
            vencimento: dateISO,
            cliente_id: customer.id,
          })
          .returning("*");

        if (!billing[0]) {
          return res.status(400).json({error: "Não foi possível cadastrar a cobrança"});
        }

        return res.status(201).json(billing[0]);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports =  registerBilling ;