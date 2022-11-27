import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
	name: string;
	avatarUrl: string;
}

export interface AuthContextDataProps {
	user: UserProps;
	isUserLoading: boolean;
	signIn: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

// AuthContext armazena o conteúdo do nosso contexto;
export const AuthContext = createContext({} as AuthContextDataProps);

// Permite compartilhar esse contexto, com toda nossa aplicação;
export function AuthContextProvider({ children }: AuthProviderProps){
	// Permite guardar as informaçoes do user autenticado
	// user tem todas as infos do usuário logado
	const [user, setUser] = useState<UserProps>({} as UserProps);

	const [isUserLoading, setIsUserLoading] = useState(false);

	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId: '320455549124-efkklqk04epga71die40ht49ru0v57b5.apps.googleusercontent.com',
		redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
		scopes: ['profile', 'email']
	});

	async function signIn(){
		try {
			setIsUserLoading(true);
			await promptAsync();

		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			setIsUserLoading(false);
		}
	}

	async function signInWithGoogle(access_token: string){
		console.log("TOKEN AQUI =>", access_token);

		try {
			setIsUserLoading(true);
			// Inserindo o accessToken em todos usuários logados;
			const tokenResponse = await api.post('/users', { access_token });
			//console.log('AQUI o tokenResponse=>', tokenResponse);
			api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

			// Recupear os dados do usuário, logado;
			const userInfoResponse = await api.get('/me');
			//console.log('AQUI o userInfoResponse.data=>', userInfoResponse.data);
			setUser(userInfoResponse.data.user);


		} catch (error) {
			console.log(error);
			throw error;
		} finally {
			setIsUserLoading(false);
		}
	}

	useEffect(() => {
		if(response?.type === 'success' && response.authentication?.accessToken){
			signInWithGoogle(response.authentication.accessToken);
		}
	}, [response]);

	return (
		<AuthContext.Provider value={{
			signIn,
			isUserLoading,
			user,
		}}>
			{ children }
		</AuthContext.Provider>
	)
}