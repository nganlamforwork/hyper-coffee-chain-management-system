interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main
      className="h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/c/c8/Cappuccino_at_Sightglass_Coffee.jpg')`,
        backgroundSize: "cover",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(150,114,89,0.7) 0%, rgba(56,34,15,0.7) 100%)",
        }}
      ></div>
      {children}
    </main>
  );
};

export default AuthLayout;
