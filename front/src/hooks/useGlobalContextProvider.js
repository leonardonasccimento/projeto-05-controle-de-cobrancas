import { useState } from "react";
import { useLocalStorage } from "react-use";
import api from "../services/api";

function useGlobalContextProvider() {
    const [token, setToken, clearToken] = useLocalStorage('token');
    const [user, setUser, clearUser] = useLocalStorage('user');
    const [users, setUsers, clearUsers]=useLocalStorage('users');
    const [customers, setCustomers, clearCustomers] = useLocalStorage('customers');
    const [charges, setCharges, clearCharges] = useLocalStorage('charges');
    const [usersArray, setUsersArray]=useState([]);
    const [customersArray, setCustomersArray] = useState([]);
    const [chargesArray, setChargesArray]=useState([]);
    const[currentCustomer, setCurrentCustomer, clearCurrentCustomer]=useLocalStorage('currentCustomer');
    const[currentCharge, setCurrentCharge, clearCurrentCharge]=useLocalStorage('currentCharge');

    async function handleUpdateUser() {
      try {
        const response = await api.get(`/usuario/${user.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status > 204) {
          return;
        }

        setUser(response.data);
      } catch (error) {
        alert(error);
      }
    }

    async function handleLoadUsersArray() {
      try {
        const response = await api.get("/usuario");
  
        if (response.status > 204) {
          return;
        }
  
        setUsersArray([...response.data]);
      } catch (error) {
        alert(error);
      }
    }

    return {
        token,
        setToken,
        clearToken,
        
        user,
        setUser,
        clearUser,

        users,
        setUsers,
        clearUsers,

        usersArray,
        setUsersArray,

        customersArray,
        setCustomersArray,

        chargesArray,
        setChargesArray,

        customers,
        setCustomers,
        clearCustomers,

        charges,
        setCharges,
        clearCharges,

        currentCustomer,
        setCurrentCustomer,
        clearCurrentCustomer,

        currentCharge,
        setCurrentCharge,
        clearCurrentCharge,

        handleUpdateUser,

        handleLoadUsersArray
    }
}

export default useGlobalContextProvider;