import { useLocation, useNavigate } from 'react-router-dom';
import Charges from '../../assets/charges.svg';
import ChargesPink from '../../assets/chargesPink.svg';
import Customers from '../../assets/customers.svg';
import CustomersPink from '../../assets/customersPink.svg';
import HomeBlack from '../../assets/homeBlack.svg';
import HomePink from '../../assets/homePink.svg';
import './styles.css';

export function Sidebar() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  function buttonHome() {
    navigate('/home');
  }

  function buttonCustomers() {
    navigate('/customers');
  }

  function buttonCharges() {
    navigate('/charges');
  }

  return (
    <div className='lateral-menu'>
      <ul className='lateral-menu-container'>
        <li
          className={`btns ${pathname === '/home' && 'selected'}`}
          onClick={() => buttonHome()}
        >
          <img src={pathname === '/home' ? HomePink : HomeBlack} alt='Home' />
          <span className='nunito-16'>Home</span>
        </li>

        <li
          className={`btns ${pathname === '/customers' && 'selected'}`}
          onClick={() => buttonCustomers()}
        >
          <img src={pathname === '/customers' ? CustomersPink : Customers} alt='Customers' />
          <span className='nunito-16'>Clientes</span>
        </li>

        <li
          className={`btns ${pathname === '/charges' && 'selected'}`}
          onClick={() => buttonCharges()}
        >
          <img src={pathname === '/charges' ? ChargesPink : Charges} alt='Charges' />
          <span className='nunito-16'>Cobranças</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;