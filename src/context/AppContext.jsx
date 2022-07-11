import { createClient } from '@supabase/supabase-js'
import React, { createContext, useContext } from 'react'


const AppContext = createContext({})

const supabase = createClient(

)

const AppContextProvider = () => {

}
const useAppContext = () => useContext(AppContext)

export {AppContext,AppContextProvider,}