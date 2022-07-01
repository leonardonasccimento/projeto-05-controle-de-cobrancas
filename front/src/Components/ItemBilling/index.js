import './styles.css';

function ItemBilling({name, identifier, value}){
    return (
      <li className="customer-billing-description">
        <strong>{name}</strong>
        <strong>{identifier}</strong>
        <strong>{value}</strong>
      </li>
    );
}

export default ItemBilling;