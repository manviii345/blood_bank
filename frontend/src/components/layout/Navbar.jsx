import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { useAuth } from "../../contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-text-primary/5">
      <Container className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-editorial text-2xl font-semibold tracking-tight text-accent-main">
              Aegis
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-text-secondary hover:text-text-primary transition-colors">About</Link>
          <Link to="/availability" className="text-text-secondary hover:text-text-primary transition-colors">Availability</Link>
          <Link to="/awareness" className="text-text-secondary hover:text-text-primary transition-colors">Donors</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to={`/dashboard/${user.role === 'super_admin' ? 'admin' : user.role}`}>
                <Button variant="ghost" className="hidden md:inline-flex">Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hidden md:inline-flex">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Donate Now</Button>
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
