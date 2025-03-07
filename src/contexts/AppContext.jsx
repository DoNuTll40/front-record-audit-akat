import { createContext, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [openModalOtp, setOpenModalOtp] = useState(false);
  const [arrowBack, setArrowBack] = useState(false);

  const toggleOtpModal = () => {
    setOpenModalOtp(!openModalOtp);
  };

  const value = { openModalOtp, toggleOtpModal, arrowBack, setArrowBack };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContextProvider };
export default AppContext;
