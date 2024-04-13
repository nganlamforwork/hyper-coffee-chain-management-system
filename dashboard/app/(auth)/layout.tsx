interface AuthLayoutProps {
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
	return (
		<main className='h-screen p-6 flex items-center justify-center'>
			{children}
		</main>
	);
};

export default AuthLayout;
