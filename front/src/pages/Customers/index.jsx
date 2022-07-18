import { useState } from 'react';
import CustomersIcon from '../../assets/customers.svg';
import FilterIcon from '../../assets/filter-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import Header from '../../Components/Header';
import ModalAddCustomer from '../../Components/ModalAddCustomer';
import Sidebar from '../../Components/Sidebar';
import TableCustomers from '../../Components/TableCustomers';
import './styles.css';

function Customers() {
    const [openModalAddCustomer, setOpenModalAddCustomer] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [clickedSearchIcon, setClickedSearchIcon] = useState(false);

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
                            onClick={() => setOpenModalAddCustomer(true)}
                        >
                            + Adicionar cliente
                        </button>
                        <button className='customer-filter'>
                            <img src={FilterIcon} alt='filter' />
                        </button>
                        <div className='search'>
                            <input 
                              type='search' 
                              placeholder='Pesquisar'
                              value={searchValue}
                              onChange={(e)=>setSearchValue(e.target.value)} 
                            />
                            <img 
                              src={SearchIcon} 
                              alt='search'
                            //   onClick={()=>setClickedSearchIcon(true)} 
                            />
                        </div>
                    </div>
                </div>
                <div className='container-customers-table'>
                    <TableCustomers
                      searchValue={searchValue}
                    />
                </div>
                <ModalAddCustomer
                    openModalAddCustomer={openModalAddCustomer}
                    handleClose={() => setOpenModalAddCustomer(false)}
                />
            </div>
        </div>
    );
}

export default Customers;