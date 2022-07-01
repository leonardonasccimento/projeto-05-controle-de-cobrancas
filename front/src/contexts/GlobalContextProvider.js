import useGlobalContextProvider from "../hooks/useGlobalContextProvider";
import GlobalContext from "./GlobalContext";

function GlobalContextProvider(props) {
    const valuesProvider = useGlobalContextProvider();

    return (
        <GlobalContext.Provider value={valuesProvider}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;