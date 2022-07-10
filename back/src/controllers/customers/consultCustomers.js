const knex = require('../../db/conection');

async function consultCustomers(req, res){
    const {query}=req.query;

    // return res.json(query);

    try {
        const foundCustomers= await knex('clientes')
        .whereILike('nome', `%${query}%`);

        return res.status(200).json(foundCustomers);
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports={consultCustomers};