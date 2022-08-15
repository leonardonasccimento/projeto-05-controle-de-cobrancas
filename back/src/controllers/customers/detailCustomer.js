const knex = require('../../db/conection');

const detailCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await knex('clientes')
        .where('id', id)
        .first();

        if (!customer) {
            return res.status(400).json({error: 'Cliente não encontrado'})
        }

        const { id: idCostumer, usuario_id, ...costumerInfo } = customer;

        return res.status(200).json(costumerInfo);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = { detailCustomer };