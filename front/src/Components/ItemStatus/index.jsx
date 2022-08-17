import './styles.css';

function ItemStatus({name, date, value}){
    return (
      <li className="customer-billing-description">
        <strong className='resized-text'>{name}</strong>
        <strong className='resized-text'>{date}</strong>
        <strong className='resized-text'>{value?`R$ ${Number(value).toFixed(2)}`.replace('.',','):''}</strong>
      </li>
    );
}

export default ItemStatus;