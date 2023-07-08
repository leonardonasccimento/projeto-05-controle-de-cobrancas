const knex = require('../../db/conection');
const supabase=require('../../utils/supabase.js');

const deleteImage = async (req, res) => {
    const {nome}=req.body;
     const {usuario}=req;

    let newName=`projeto05Local/usuario/${usuario.id}/${usuario.imagem_nome}`;
    
    try {
        if(usuario.imagem_nome!==nome){
            return res.status(400).json({error: 'Imagem não encontrada'});
        }

        const resultRemove = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .remove(newName);

        if (resultRemove.error) {
          return res.status(400).json({error: resultRemove.error});
        }

        const userImageUrl = await knex("usuarios")
        .update({
          imagem_url: null,
          imagem_nome: null
        })
        .where("id", usuario.id)
        .returning("*");

        if (userImageUrl.length === 0) {
          return res.status(401).json({ error: "Não foi possível remover a imagem." });
        }

        return res.status(200).json(resultRemove);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports=deleteImage;