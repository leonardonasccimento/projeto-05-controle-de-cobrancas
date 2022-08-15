const knex = require('../../db/conection');
const supabase=require('../../utils/supabase.js');
const sizeof = require('object-sizeof')

async function uploadImage(req, res){
    const {nome, imagem}=req.body;
    const {usuario}=req;

    if(sizeof(imagem)>13981013){
        return res.status(400).json('O arquivo deve ter o tamanho máximo de aproximadamente 5mb');
    }

    if(!(Buffer.from( Buffer.from(imagem, 'base64')).toString('base64')===imagem)){
        return res.status(400).json('Aparentemente o dado inserido não é um dado em base64. https://base64.guru/converter/encode/image');
    }

    let newName=nome.replace(/ /g, '').split('').reverse().join().replace('.', '.'+Math.floor(Math.random() * 100000)+'_').split('').reverse().join().replace(/,/g,'');
    let newWay=`projeto05/usuario/${usuario.id}/${newName}`;
    const imageBuffer=Buffer.from(imagem, 'base64');

    try {
        const resultList = await supabase.storage
        .from('delivery2')
        .list(`projeto05/usuario/${usuario.id}`);

        if(resultList.error){
            return res.status(400).json({error: resultList.error});
        }

        if(resultList.data.length>0){
            const resultRemove = await supabase.storage
            .from(process.env.SUPABASE_BUCKET)
            .remove(`projeto05/usuario/${usuario.id}/${resultList.data[0].name}`);
    
            if(resultRemove.error){
                return res.status(400).json({error: resultRemove.error});
            }
        }

        const resultUpload = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(newWay, imageBuffer);

        if(resultUpload.error){
            return res.status(400).json({error: resultUpload.error});;
        }

        const resultUrl = supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(newWay);

        if(resultUrl.error){
            return res.status(400).json({error: resultUrl.error});
        }

        const userImageUrl = await knex("usuarios")
        .update({
           imagem_url: resultUrl.data.publicURL,
           imagem_nome: newName
        })
        .where("id", usuario.id)
        .returning("*");

        if (userImageUrl.length === 0) {
          return res.status(401).json({ error: "Não foi possível carregar a imagem." });
        }

        return res.status(200).json(userImageUrl);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function deleteImage(req, res){
    const {nome}=req.body;
    const {usuario}=req;

    let newName=`projeto05/usuario/${usuario.id}/${usuario.imagem_nome}`;
    
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
          imagem_nome: null,
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

module.exports={
    uploadImage,
    deleteImage
}