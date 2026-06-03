import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(formData.email, formData.password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-white/50 mb-6">
          Login to BizSense AI
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-surface border border-surface-border text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-surface border border-surface-border text-white"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-electric text-black font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/50">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-electric hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}