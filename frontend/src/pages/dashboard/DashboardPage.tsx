import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const DashboardPage = () => {
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-600">
          Welcome, <span className="font-medium text-gray-900">{email}</span>!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          Browse movies →
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
