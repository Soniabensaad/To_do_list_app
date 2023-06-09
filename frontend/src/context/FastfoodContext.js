import React, {useState, createContext} from "react";


export const FastfoodContext = createContext();

export const FastfoodContextProvider = (props) => {
    const [fastfood, setFastfood] = useState([]);
    const [selectedFastfood, setSelectedFastfood] = useState(null);

    const addFastfoods = (fastfood) => {
        setFastfood([...fastfood, fastfood]);
      };
    return  (
        <FastfoodContext.Provider value={{
            fastfood,
             setFastfood,
              addFastfoods,
               selectedFastfood,
               setSelectedFastfood}}>
            {props.children}
        </FastfoodContext.Provider> 
    )
}
