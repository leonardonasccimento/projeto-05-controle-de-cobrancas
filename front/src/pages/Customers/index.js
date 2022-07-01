import { useState } from 'react';
import CustomersIcon from '../../assets/customers.svg';
import FilterIcon from '../../assets/filter-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import Header from '../../Components/Header';
import ModalCustomers from '../../Components/ModalCustomers';
import Sidebar from '../../Components/Sidebar';
import TableCustomers from '../../Components/TableCustomers';
import './styles.css';

function Customers() {
    const [openModalAddCustomers, setOpenModalAddCustomers] = useState('');

    return (
        <div className="container-home">
            <Sidebar />

            <div className="container-header-section">
                <Header />
                <div className='customers-header'>
                    <div className='customers-title'>
                        <img src={CustomersIcon} alt='customers' />
                        <h2>Clientes</h2>
                    </div>
                    <div className='customers-header-actions'>
                        <button
                            className='btn-pink btn-add'
                            onClick={() => setOpenModalAddCustomers(true)}
                        >
                            + Adicionar cliente
                        </button>
                        <button className='customer-filter'>
                            <img src={FilterIcon} alt='filter' />
                        </button>
                        <div className='search'>
                            <input type='text' placeholder='Pesquisa' />
                            <img src={SearchIcon} alt='search' />
                        </div>
                    </div>
                </div>
                <div className='container-customers-table'>
                    <TableCustomers />
                </div>
                <ModalCustomers
                    open={openModalAddCustomers}
                    handleClose={() => setOpenModalAddCustomers(false)}
                />
            </div>
        </div>
    );
}

export default Customers;