import { useEffect } from 'react';
import BillingStatus from '../../Components/BillingStatus';
import BillingStatus2 from '../../Components/BillingStatus2';
import BillingStatus3 from '../../Components/BillingStatus3';
import ChargeCard from '../../Components/ChargeCard';
import CustomerStatus from '../../Components/CustomerStatus';
import CustomerStatus2 from '../../Components/CustomerStatus2';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import { customerDescriptionData, statusCobrancas, typesOfCharge } from '../../data/index.js';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import './styles.css';

function Home() {
  const { 
    token, 
    chargesArray, 
    setChargesArray, 
    setUsersArray
  } = useGlobalContext();

  async function handleLoadUsersArray() {
    try {
      const response = await api.get("/usuario");

      if (response.status > 204) {
        return;
      }

      setUsersArray([...response.data]);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleCharges() {
    try {
      const response = await api.get("/cobranca?query", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      setChargesArray([...response.data]);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    handleLoadUsersArray();
    handleCharges();
  });

  let sumChargesPaid = 0;
  let sumExpectedCharges = 0;
  let sumOverdueCharges = 0;
  for (let chargeObject of chargesArray) {
    if (chargeObject.status === "pago") {
      sumChargesPaid += chargeObject.valor;
    }

    if (chargeObject.status === "pendente") {
      sumExpectedCharges += chargeObject.valor;
    }

    if (chargeObject.status === "vencido") {
      sumOverdueCharges += chargeObject.valor;
    }
  }
  const arraySumValue = [sumChargesPaid, sumOverdueCharges, sumExpectedCharges];

  let chargesBillingPaidName = [];
  let chargesBillingPaidIdentifier = [];
  let chargesBillingPaidValue = [];
  let chargesPendingBillingName = [];
  let chargesPendingBillingIdentifier = [];
  let chargesPendingBillingValue = [];
  let chargesOverdueBillingName = [];
  let chargesOverdueBillingIdentifier = [];
  let chargesOverdueBillingValue = [];
  for (let chargeObject of chargesArray) {
    if (chargeObject.status === "pago") {
      chargesBillingPaidName.push(chargeObject.cliente);
      chargesBillingPaidIdentifier.push(chargeObject.id);
      chargesBillingPaidValue.push(`${chargeObject.valor}`);
    }

    if (chargeObject.status === "pendente") {
      chargesPendingBillingName.push(chargeObject.cliente);
      chargesPendingBillingIdentifier.push(chargeObject.id);
      chargesPendingBillingValue.push(`${chargeObject.valor}`);
    }

    if (chargeObject.status === "vencido") {
      chargesOverdueBillingName.push(chargeObject.cliente);
      chargesOverdueBillingIdentifier.push(chargeObject.id);
      chargesOverdueBillingValue.push(`${chargeObject.valor}`);
    }
  }
  const arrayBillingPaid = [
    chargesBillingPaidName,
    chargesBillingPaidIdentifier,
    chargesBillingPaidValue,
  ];
  const arrayPendingBilling = [
    chargesPendingBillingName,
    chargesPendingBillingIdentifier,
    chargesPendingBillingValue,
  ];
  const arrayOverdueBilling = [
    chargesOverdueBillingName,
    chargesOverdueBillingIdentifier,
    chargesOverdueBillingValue,
  ];

  let customerOverdueBillingName = [];
  let customerOverdueBillingIdentifier = [];
  let customerOverdueBillingValue = [];
  let regularCustomersName = [];
  let regularCustomersIdentifier = [];
  let regularCustomersValue = [];
  for (let chargeObject of chargesArray) {
    if (chargeObject.status === "vencido") {
      customerOverdueBillingName.push(chargeObject.cliente);
      customerOverdueBillingIdentifier.push(chargeObject.vencimento);
      customerOverdueBillingValue.push(`${chargeObject.valor}`);
    }

    if (
      chargeObject.status === "pago" ||
      ("pendente" && chargeObject.status !== "vencido")
    ) {
      regularCustomersName.push(chargeObject.cliente);
      regularCustomersIdentifier.push(chargeObject.vencimento);
      regularCustomersValue.push(`${chargeObject.valor}`);
    }
  }
  const arrayRegularCustomers = [
    regularCustomersName,
    regularCustomersIdentifier,
    regularCustomersValue,
  ];
  const arrayDelinquentCustomers = [
    customerOverdueBillingName,
    customerOverdueBillingIdentifier,
    customerOverdueBillingValue,
  ];

  return (
    <div className="container-home">
      <Sidebar />
      <div className="container-header-section">
        <Header />
        <div className="charges-home">
          <div
            className="space"
            style={{
              width: "4rem",
              height: "100%",
              color: "#f8f8f9",
            }}
          >
          s
          </div>
          <div className="charges-home-internal">
            <div className="summary-charges-paid">
              {statusCobrancas.map((statusCobranca, index) => (
                <ChargeCard
                  key={statusCobranca.id}
                  img={statusCobranca.img}
                  description={statusCobranca.description}
                  value={arraySumValue[index]}
                  backgroundColor={statusCobranca.backgroundColor}
                />
              ))}
            </div>
            <div className="customer-pay-tables">
              <BillingStatus
                key={typesOfCharge[0].id}
                title={typesOfCharge[0].title}
                number={typesOfCharge[0].number}
                backgroundColor={typesOfCharge[0].backgroundColor}
                color={typesOfCharge[0].color}
                arrayOverdueBilling={arrayOverdueBilling}
              />
              <BillingStatus2
                key={typesOfCharge[1].id}
                title={typesOfCharge[1].title}
                number={typesOfCharge[1].number}
                backgroundColor={typesOfCharge[1].backgroundColor}
                color={typesOfCharge[1].color}
                arrayPendingBilling={arrayPendingBilling}
              />
              <BillingStatus3
                key={typesOfCharge[2].id}
                title={typesOfCharge[2].title}
                number={typesOfCharge[2].number}
                backgroundColor={typesOfCharge[2].backgroundColor}
                color={typesOfCharge[2].color}
                arrayBillingPaid={arrayBillingPaid}
              />
            </div>
            <div className="customer-status-tables">
              <CustomerStatus
                key={customerDescriptionData[0].id}
                img={customerDescriptionData[0].img}
                title={customerDescriptionData[0].title}
                backgroundColor={customerDescriptionData[0].backgroundColor}
                color={customerDescriptionData[0].color}
                number={customerDescriptionData[0].number}
                arrayDelinquentCustomers={arrayDelinquentCustomers}
              />
              <CustomerStatus2
                key={customerDescriptionData[1].id}
                img={customerDescriptionData[1].img}
                title={customerDescriptionData[1].title}
                backgroundColor={customerDescriptionData[1].backgroundColor}
                color={customerDescriptionData[1].color}
                number={customerDescriptionData[1].number}
                arrayRegularCustomers={arrayRegularCustomers}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


