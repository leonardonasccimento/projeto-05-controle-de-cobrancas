import AnticipatedCharges from '../assets/anticipatedCharges.svg';
import ChargesPaid from '../assets/chargesPaid.svg';
import DeliquentCustomerIcon from '../assets/delinquent-customer-icon.svg';
import OverdueCharge from '../assets/overdueCharges.svg';
import RegularCustomerIcon from '../assets/regular-customer-icon.svg';

//=====================================================
export const positionsNumber = [];
let N = 4;
for (let i = 1; i <= N; i++) {
    positionsNumber.push(i);
}
//=====================================================
export const statusCobrancas = [
    {
        id: 1,
        // img: {ChargesPaid},
        img: ChargesPaid,
        description: 'cobrancas Pagas',
        value: `9000`,
        backgroundColor: '#EEF7F7'
    },
    {
        id: 2,
        // img: {OverdueCharge},
        img: OverdueCharge,
        description: 'Cobranças vencidas',
        value: `5000`,
        backgroundColor: '#FFEFEF'
    },
    {
        id: 3,
        // img: {AnticipatedCharges},
        img: AnticipatedCharges,
        description: 'Cobranças Previstas',
        value: `2000`,
        backgroundColor: '#FCF6DC'
    },
];

//===================================================
export const typesOfCharge = [
    {
        id: 1,
        title: 'Cobranças Vencidas',
        number: '08',
        backgroundColor: '#FFEFEF',
        color: '#971D1D'
    },
    {
        id: 2,
        title: 'Cobranças Previstas',
        number: '05',
        backgroundColor: '#FCF6DC',
        color: '#C5A605'
    },
    {
        id: 3,
        title: 'Cobranças Pagas',
        number: '10',
        backgroundColor: '#EEF6F6',
        color: '#1FA7AF'
    },
];

//====================================================
export const customerDescriptionData = [
    {
        id: 1,
        // img: {DeliquentCustomerIcon},
        img: DeliquentCustomerIcon,
        title: 'Clientes Inadimplentes',
        number: '08',
        backgroundColor: '#FFEFEF',
        color: '#971D1D'
    },
    {
        id: 2,
        // img: {RegularCustomerIcon},
        img: RegularCustomerIcon,
        title: 'Clientes em dia',
        number: '08',
        backgroundColor: '#EEF6F6',
        color: '#1FA7AF'
    },
]
//========================================
export const cobrancasVencidas = [
    {
        id: 1,
        name: "Sara Silva",
        identifier: "223456787",
        value: "R$ 1000,00",
    },
    {
        id: 2,
        name: "Leandro Amaral",
        identifier: "223456787",
        value: "R$ 1000,00",
    },
    {
        id: 3,
        name: "Carla Nogueira",
        identifier: "223456787",
        value: "R$ 1000,00",
    },
    {
        id: 4,
        name: "Guilerme Souza",
        identifier: "223456787",
        value: "R$ 1000,00",
    },
];
export const cobrancasPrevistas = [
    {
        id: 1,
        name: 'Juliana Souza',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 2,
        name: 'Daniel Martins',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 3,
        name: 'Pedro Alcantara',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 4,
        name: 'Vanessa Santos',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    // ...
]
export const cobrancasPagas = [
    {
        id: 1,
        name: 'Luciano Lima',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 2,
        name: 'Verônica Léles',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 3,
        name: 'Luana Silveira',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    {
        id: 4,
        name: 'Márcio Brandão',
        identifier: '223456787',
        value: 'R$ 1000,00'
    },
    // ...
]
//==========================================
export const clienteInadiplente = [
    {
        id: 1,
        name: 'Cameron Williamson',
        date: '03/02/2021',
        value: 'R$ 500,00'
    },
    //...
]
export const clienteRegular = [
    {
        id: 1,
        name: 'Jeferson Harper',
        date: '03/02/2021',
        value: 'R$ 500,00'
    },
    // ...
]
//================================================