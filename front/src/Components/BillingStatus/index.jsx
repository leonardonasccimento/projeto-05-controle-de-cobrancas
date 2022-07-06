import { Link } from 'react-router-dom';
import { positionsNumber } from '../../data/index.js';
import ItemBilling from '../ItemBilling';
import './styles.css';

function BillingStatus({
  title,
  number,
  backgroundColor,
  color,
  arrayOverdueBilling,
  }){

  return (
    <div className="customer-charge-card">
      <div className="charge-card-header">
        <h2>{title}</h2>
        <strong
          style={{
            backgroundColor: `${backgroundColor}`,
            color: `${color}`,
          }}
        >
          {number}
        </strong>
      </div>

      <div className="charge-header">
        <h4>Cliente</h4>
        <h4>ID da cob.</h4>
        <h4>Valor</h4>
      </div>

      <ul className="separator">
        {positionsNumber.map((position, index) => (
          <ItemBilling
            key={index}
            name={arrayOverdueBilling[0][index]}
            identifier={arrayOverdueBilling[1][index]}
            value={`${arrayOverdueBilling[2][index] ?? ""}`}
          />
        ))}
      </ul>

      <div className="see-all">
        <Link to="/charges">Ver Todos</Link>
      </div>
    </div>
  );
}

export default BillingStatus;