import { useState, useEffect } from "react";
import { Container } from "../components/ui/Container";
import api from "../lib/api";

export function Availability() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/inventory')
      .then(res => {
        setInventory(res.data.data);
      })
      .catch(err => {
        console.error("Failed to load inventory", err);
        setError("Unable to connect to the Aegis database. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-20 bg-surface min-h-screen">
      <Container>
        <h1 className="text-5xl font-editorial mb-4">Live Availability</h1>
        <p className="text-text-secondary mb-12">Real-time blood stock across the Aegis network.</p>

        {error && (
          <div className="mb-8 p-4 bg-status-error-bg text-status-error border border-status-error/20 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-text-secondary py-10">Loading inventory data...</div>
        ) : !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {inventory.map(item => (
              <div key={item.blood_group} className="bg-white p-6 rounded-2xl border border-text-primary/5 shadow-sm flex flex-col items-center">
                <span className="text-3xl font-editorial text-accent-main mb-2">{item.blood_group}</span>
                <span className="text-sm font-medium text-text-secondary">
                  {Math.floor(item.quantity_ml / 450)} Units
                </span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
