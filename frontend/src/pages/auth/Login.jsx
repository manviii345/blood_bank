import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Container } from "../../components/ui/Container";
import { useAuth } from "../../contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === "super_admin") navigate("/dashboard/admin");
      else navigate(`/dashboard/${user.role}`);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--color-accent-muted),_transparent_60%)] opacity-50" />
      
      <Container className="max-w-[480px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-editorial border border-text-primary/5"
        >
          <div className="flex justify-center mb-8">
             <div className="h-12 w-12 rounded-2xl bg-accent-muted flex items-center justify-center text-accent-main">
                <Shield className="h-6 w-6" />
             </div>
          </div>
          <h2 className="text-3xl font-editorial text-center mb-2">Sign In to Aegis</h2>
          <p className="text-center text-text-secondary text-sm mb-10">Secure access to the blood bank network.</p>
          
          <form className="flex flex-col space-y-4 mb-8" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Email</label>
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@hospital.org" className="w-full h-11 px-4 rounded-md border border-text-primary/10 bg-surface-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-main/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Password</label>
              <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full h-11 px-4 rounded-md border border-text-primary/10 bg-surface-muted focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-main/50 transition-all" />
            </div>
            <Button type="submit" className="w-full mt-4">Sign In</Button>
          </form>

          <div className="text-center">
            <Link to="/register" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
              Don't have an account? Sign up
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

