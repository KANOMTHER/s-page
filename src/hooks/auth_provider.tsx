import { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	setUser: (user: AuthUserType) => void;
	login: (user: LoginType) => Promise<unknown>;
	logout: () => void;
	getUser: () => AuthUserType | null;
	navigateTo: (role: string) => void;
}

export const AuthContext = createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthUserType | null>(null);

	const navigate = useNavigate();

	const navigateTo = (role: string) => {
		if (role === 'admin') {
			navigate('/admin');
		} else if (role === 'student') {
			navigate('/students/profile');
		} else if (role === 'teacher') {
			navigate('/teachers');
		}
	};

	interface LoginComponent {
		login(user: LoginType): Promise<unknown>;
	}

	class LoginConcreteComponent implements LoginComponent {
		public async login(user: LoginType) {
			await axfetch.post('/api/auth/login', user).then((res) => {
				setUser(res.data);
				navigateTo(res.data.role);
			});
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

	class LoginErrorDecorator extends LoginDecorator {
		public async login(user: LoginType): Promise<void> {
			try {
				await super.login(user);
			} catch (error) {
				alert('Invalid credentials');
			}
		}
	}

	const getUser = () => {
		axfetch.get('/api/auth').then((res) => {
			setUser(res.data ?? null);
		});
		return user;
	}

	const login = async (user: LoginType) => {
		const login = new LoginErrorDecorator(new LoginConcreteComponent());
		await login.login(user);
	};

	const logout = () => {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		navigate('/');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, setUser, getUser, navigateTo }}>{children}</AuthContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
