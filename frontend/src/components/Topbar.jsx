import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold">
        Welcome, {user?.name}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
      

    </div>
  );
}

export default Topbar;