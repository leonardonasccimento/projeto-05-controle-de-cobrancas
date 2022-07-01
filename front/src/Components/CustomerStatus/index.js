import { Link } from 'react-router-dom';
import { positionsNumber } from '../../data/index.js';
import ItemStatus from '../ItemStatus';
import './styles.css';

function CustomerStatus({
  img,
  title,
  backgroundColor,
  color,
  number,
  arrayDelinquentCustomers,
  }){

  return (
    <div className="customer-charge-card customer-status-card">
      <div className="charge-card-header">
        <div className="status-img-title">
          <img src={img} alt="" />
          <h2>{title}</h2>
        </div>
        <strong
          style={{
            backgroundColor: `${backgroundColor}`,
            color: `${color}`,
          }}
        >
          {number}
        </strong>
      </div>

      <div className="charge-header ">
        <h4>Clientes</h4>
        <h4>Data de venc.</h4>
        <h4>Valor</h4>
      </div>

      <ul className="separator">
        {positionsNumber.map((position, index) => (
          <ItemStatus
            name={arrayDelinquentCustomers[0][index]}
            date={
              arrayDelinquentCustomers[1][index]? 
              new Date(arrayDelinquentCustomers[1][index]).toLocaleDateString():
              ""
            }
            value={`${arrayDelinquentCustomers[2][index] ?? ""}`}
          />
        ))}
      </ul>

      <div className="see-all">
        <Link to="/customers">Ver Todos</Link>
      </div>
    </div>
  );
}

export default CustomerStatus;