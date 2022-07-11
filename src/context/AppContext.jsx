import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const AppContext = createContext({});


const AppContextProvider = ({children}) => {
  const supabase = createClient(
    "https://utybkjndivaewaatsisa.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWJram5kaXZhZXdhYXRzaXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc1MTE2NjcsImV4cCI6MTk3MzA4NzY2N30.rx3pZlxCK8p1WQTy-zUiMNsUdKzVHwhltVRhzni38NE"
  );

  return(
    <AppContext.Provider
      value={{supabase,test: "matamu"}}
    >
      {children}
    </AppContext.Provider>
  )
};
const useAppContext = () => useContext(AppContext);

export { AppContext, AppContextProvider, useAppContext };
