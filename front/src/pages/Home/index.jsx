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
import { getItem, setItem } from '../../utils/localStorage';
import './styles.css';

function Home() {
  // setItem("charges", getItem("charges") ?? 0);
  // setItem("customers", getItem("customers") ?? 0);

  const { 
    token, 
    charges, 
    setCharges, 
    setCustomersData, 
    customers, 
    chargesArray, 
    setCustomers, 
    setChargesArray } = useGlobalContext();

  async function handleCharges() {
    try {
      const response = await api.get("/cobranca", {
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

  // async function handleCharges() {
  //   try {
  //     const response = await api.get("/cobranca", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status > 204) {
  //       return;
  //     }

  //     setCharges(response.data);
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // }

  // async function handleCustomers() {
  //   try {
  //     const response = await api.get("/cliente", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status > 204) {
  //       return;
  //     }

  //     setCustomersData(response.data);
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // }

  useEffect(() => {
    handleCharges();
    // handleCustomers();
  });

  let sumChargesPaid = 0;
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "pago") {
      sumChargesPaid += chargesArray[i].valor;
    }
  }

  let sumOverdueCharges = 0;
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "vencido") {
      sumOverdueCharges += chargesArray[i].valor;
    }
  }

  let sumExpectedCharges = 0;
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "pendente") {
      sumExpectedCharges += chargesArray[i].valor;
    }
  }

  const arraySumValue = [sumChargesPaid, sumOverdueCharges, sumExpectedCharges];

  let chargesBillingPaidName = [];
  let chargesBillingPaidIdentifier = [];
  let chargesBillingPaidValue = [];
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "pago") {
      chargesBillingPaidName.push(chargesArray[i].cliente);
      chargesBillingPaidIdentifier.push(chargesArray[i].id);
      chargesBillingPaidValue.push(`${chargesArray[i].valor}`);
    }
  }
  const arrayBillingPaid = [
    chargesBillingPaidName,
    chargesBillingPaidIdentifier,
    chargesBillingPaidValue,
  ];

  let chargesPendingBillingName = [];
  let chargesPendingBillingIdentifier = [];
  let chargesPendingBillingValue = [];
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "pendente") {
      chargesPendingBillingName.push(chargesArray[i].cliente);
      chargesPendingBillingIdentifier.push(chargesArray[i].id);
      chargesPendingBillingValue.push(`${chargesArray[i].valor}`);
    }
  }
  const arrayPendingBilling = [
    chargesPendingBillingName,
    chargesPendingBillingIdentifier,
    chargesPendingBillingValue,
  ];

  let chargesOverdueBillingName = [];
  let chargesOverdueBillingIdentifier = [];
  let chargesOverdueBillingValue = [];
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "vencido") {
      chargesOverdueBillingName.push(chargesArray[i].cliente);
      chargesOverdueBillingIdentifier.push(chargesArray[i].id);
      chargesOverdueBillingValue.push(`${chargesArray[i].valor}`);
    }
  }
  const arrayOverdueBilling = [
    chargesOverdueBillingName,
    chargesOverdueBillingIdentifier,
    chargesOverdueBillingValue,
  ];

  let customerOverdueBillingName = [];
  let customerOverdueBillingIdentifier = [];
  let customerOverdueBillingValue = [];
  for (let i = 0; i < chargesArray.length; i++) {
    if (chargesArray[i].status === "vencido") {
      customerOverdueBillingName.push(chargesArray[i].cliente);
      customerOverdueBillingIdentifier.push(chargesArray[i].vencimento);
      customerOverdueBillingValue.push(`${chargesArray[i].valor}`);
    }
  }
  const arrayDelinquentCustomers = [
    customerOverdueBillingName,
    customerOverdueBillingIdentifier,
    customerOverdueBillingValue,
  ];

  let regularCustomersName = [];
  let regularCustomersIdentifier = [];
  let regularCustomersValue = [];
  for (let i = 0; i < chargesArray.length; i++) {
    if (
      chargesArray[i].status === "pago" ||
      ("pendente" && chargesArray[i].status !== "vencido")
    ) {
      regularCustomersName.push(chargesArray[i].cliente);
      regularCustomersIdentifier.push(chargesArray[i].vencimento);
      regularCustomersValue.push(`${chargesArray[i].valor}`);
    }
  }
  const arrayRegularCustomers = [
    regularCustomersName,
    regularCustomersIdentifier,
    regularCustomersValue,
  ];

  return (
    <div className="container-home">
      <Sidebar />

      <div className="container-header-section">
        <Header />

        <div className="charges-home">
          <div className="summary-charges-paid">
            {statusCobrancas.map((statusCobranca, index) => (
              <ChargeCard
                key={statusCobranca.id}
                img={statusCobranca.img}
                description={statusCobranca.description}
                // value={statusCobranca.value}
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
  );
}

export default Home;


