import { useState } from 'react';
import ChargesIcon from '../../assets/charges.svg';
import FilterIcon from '../../assets/filter-icon.svg';
import SearchIcon from '../../assets/search-icon.svg';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import TableCharges from '../../Components/TableCharges';
import './styles.css';

function Charges() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="container-home">
      <Sidebar />

      <div className="container-header-section">
        <Header />
        <div className="customers-header">
          <div className="customers-title">
            <img src={ChargesIcon} alt="charges" />
            <h2>Cobranças</h2>
          </div>
          <div className="customers-header-actions">
            <button className="customer-filter">
              <img src={FilterIcon} alt="filter" />
            </button>
            <div className="search">
              <input 
                type="text" 
                placeholder="Pesquisar"
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)} 
              />
              <img 
                src={SearchIcon} 
                alt="search" 
              />
            </div>
          </div>
        </div>
        <div className="container-customers-table">
          <TableCharges
            searchValue={searchValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Charges;