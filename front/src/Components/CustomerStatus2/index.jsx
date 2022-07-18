import { Link } from 'react-router-dom';
import { positionsNumber } from '../../data/index.js';
import ItemStatus from '../ItemStatus';
import './styles.css';

function CustomerStatus2({
  img,
  title,
  backgroundColor,
  color,
  number,
  arrayRegularCustomers,
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
            key={index}
            name={arrayRegularCustomers[0][index]}
            date={
              arrayRegularCustomers[1][index]? 
              new Date(arrayRegularCustomers[1][index]).toLocaleDateString():
              ""
            }
            value={`${arrayRegularCustomers[2][index] ?? ""}`}
          />
        ))}
      </ul>
      <div className="see-all">
        <Link to="/customers">Ver Todos</Link>
      </div>
    </div>
  );
}

export default CustomerStatus2;