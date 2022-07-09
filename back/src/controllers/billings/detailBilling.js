const knex = require('../../db/conection');

const detailBilling = async (req, res) => {
    const { id } = req.params;

    try {
        const billing = await knex('cobrancas')
        .where('id', id)
        .first();

        const result={
            id: billing.id,
            cliente: billing.cliente,
            descricao: billing.descricao,
            status: billing.status,
            valor: billing.valor,
            vencimento: billing.vencimento
        };

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { detailBilling };