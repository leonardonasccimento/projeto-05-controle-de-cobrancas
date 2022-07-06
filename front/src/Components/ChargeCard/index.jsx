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
      <h2>{`R$ ${value}`.replace('.',',')}</h2>
    </div>
  );
}

export default ChargeCard;