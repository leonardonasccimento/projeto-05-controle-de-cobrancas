import { useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalContextProvider() {
    const [token, setToken, clearToken] = useLocalStorage('token');
    const [user, setUser, clearUser] = useLocalStorage('user');
    const [usersArray, setUsersArray, clearUsersArray]=useLocalStorage('usersArray');
    const [charges, setCharges, clearCharges] = useLocalStorage('charges');
    const [customersData, setCustomersData, clearCustomersData] = useLocalStorage('customers');
    const [customers, setCustomers] = useState([]);
    const [chargesArray, setChargesArray]=useState([]);
    const[currentCustomer, setCurrentCustomer, clearCurrentCustomer]=useLocalStorage('currentCustomer');
    const[currentCharge, setCurrentCharge, clearCurrentCharge]=useLocalStorage('currentCharge');

    return {
        token,
        setToken,
        clearToken,
        
        user,
        setUser,
        clearUser,

        usersArray,
        setUsersArray,
        clearUsersArray,

        customers,
        setCustomers,

        charges,
        setCharges,
        clearCharges,

        customersData,
        setCustomersData,
        clearCustomersData,

        chargesArray,
        setChargesArray,

        currentCustomer,
        setCurrentCustomer,
        clearCurrentCustomer,

        currentCharge,
        setCurrentCharge,
        clearCurrentCharge,
    }
}

export default useGlobalContextProvider;