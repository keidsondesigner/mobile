import { createContext, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';

interface UserProps {
	name: string;
	avatarUrl: string;
}

export interface AuthContextDataProps {
	user: UserProps;
	signIn: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

// AuthContext armazena o conteúdo do nosso contexto;
export const AuthContext = createContext({} as AuthContextDataProps);

// Permite compartilhar esse contexto, com toda nossa aplicação;
export function AuthContextProvider({ children }: AuthProviderProps){

	console.log(AuthSession.makeRedirectUri({ useProxy: true }));

	async function signIn(){
		console.log('Logando...');
	}

	return (
		<AuthContext.Provider value={{
			signIn,
			user: {
				name: 'Keidson',
				avatarUrl: 'https://github.com/keidsondesigner.png',
			}
		}}>
			{ children }
		</AuthContext.Provider>
	)
}