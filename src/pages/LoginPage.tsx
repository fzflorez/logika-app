import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 bg-[url('/src/assets/background.svg')] bg-cover bg-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <img
            src="/src/assets/logo.svg"
            alt="be kind network"
            className="h-16 w-auto"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8 leading-tight">
          ¡Empieza a conectar tu comunidad ante buenas acciones!
        </h1>

        <LoginForm />
      </div>
    </div>
  );
}
