import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCookie from '@/utils/getcookie';
import axfetch from '@/utils/axfetch';

type AuthUserType = {
	id: number;
	role: string;
};

type LoginType = {
	id: number;
	password: string;
};

interface AuthType {
	user: AuthUserType | null;
	token: string | null;
	login: (user: LoginType) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUserType | null>(null);
	const [token, setToken] = useState<string | null>(null);

	const navigate = useNavigate();

	interface LoginComponent {
		login(user: LoginType): Promise<void>;
	}

	class LoginConcreteComponent implements LoginComponent {
		public async login(user: LoginType) {
			await	axfetch.post('/api/auth/login', user).then((res) => {
				setUser(res.data);
				setToken(getCookie('session') || '');
				console.log(res.data);
			})
		}
	}

	class LoginDecorator implements LoginComponent {
		protected loginComponent: LoginComponent;

		constructor(loginComponent: LoginComponent) {
			this.loginComponent = loginComponent;
		}

		public async login(user: LoginType) {
			await this.loginComponent.login(user);
		}
	}

	class LoginToHomeDecorator extends LoginDecorator {
		public async login(_user: LoginType) {
			await super.login(_user);
			console.log(user)
			if (user?.role === 'admin') {
				navigate('/admin');
			}
			else if (user?.role === 'student') {
				navigate('/students');
			}
			else if (user?.role === 'teacher') {
				navigate('/teachers');
			}
			else {
				navigate('/');
			}
		}
	}

	class LoginErrorDecorator extends LoginDecorator {
		public async login(user: LoginType): Promise<void> {
			try {
				await super.login(user);
			} catch (error) {
				console.error('Error:', error);
			}
		}
	}

	const login = async (user: LoginType) => {
		const login = new LoginToHomeDecorator(new LoginErrorDecorator(new LoginConcreteComponent()));
		await login.login(user);
	};

	const logout = () => {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;