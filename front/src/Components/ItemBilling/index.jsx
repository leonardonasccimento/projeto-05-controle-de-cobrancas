import './styles.css';

function ItemBilling({name, identifier, value}){
    return (
      <li className="customer-billing-description">
        <strong className='resized-text'>{name}</strong>
        <strong className='resized-text'>{identifier}</strong>
        <strong className='resized-text'>{value?`R$ ${value}`.replace('.',','):''}</strong>
      </li>
    );
}

export default ItemBilling;