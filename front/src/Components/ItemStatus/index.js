import './styles.css';

function ItemStatus({name, date, value}){
    return (
      <li className="customer-billing-description">
        <strong>{name}</strong>
        <strong>{date}</strong>
        <strong>{value}</strong>
      </li>
    );
}

export default ItemStatus;