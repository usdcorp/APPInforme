import {createContext} from 'react';

export const credentialsContext = createContext({storedCredentials: {}, setstoredCredentials: ()=>{}});