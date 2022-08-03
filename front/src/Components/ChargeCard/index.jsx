import './styles.css';

function ChargeCard({ img, description, value, backgroundColor }) {
  return (
    <div
      className="customize-paid"
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <img src={img} alt="Charges paid" />
      <h3>{description}</h3>
      <h2
       style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis'
       }}
      >{`R$ ${value.toFixed(2)}`.replace('.',',')}</h2>
    </div>
  );
}

export default ChargeCard;