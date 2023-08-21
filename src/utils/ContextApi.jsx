import { createContext, useState } from "react";

export const Context = createContext();

export const AppContext = (props) => {
  const [imageSearch, setImageSearch] = useState(false); // state to change the result type to images
  return (
    <Context.Provider
      value={{
        imageSearch,
        setImageSearch,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
