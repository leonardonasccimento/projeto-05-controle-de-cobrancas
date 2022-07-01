import * as yup from 'yup';

export const schemaAddCustomer = yup.object().shape({
    nome: yup.string()
        .required('O nome é obrigatório'),

    email: yup.string()
        .email('Digite um e-mail válido')
        .required('O e-mail é obrigatório'),

    cpf: yup.string(),

    telefone: yup.string(),

    endereco: yup.string()
        .required('O endereço é obrigatório'),

    complemento: yup.string()
        .required('O complemento é obrigatório'),

    cep: yup.string(),

    bairro: yup.string(),

    cidade: yup.string(),

    uf: yup.string()
})