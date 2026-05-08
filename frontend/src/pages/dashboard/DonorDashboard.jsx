import { useState, useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Heart } from "lucide-react";
import api from "../../lib/api";

import { useAuth } from "../../contexts/AuthContext";

export function DonorDashboard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/donations')
      .then(res => setDonations(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 bg-surface min-h-screen">
      <Container className="max-w-[1000px]">
        <header className="mb-12">
          <h1 className="text-4xl font-editorial tracking-tight text-text-primary">Welcome back, {user?.first_name || 'Donor'}.</h1>
          <p className="text-text-secondary mt-2">Your next eligible donation date is <strong className="text-text-primary">Nov 14, 2026</strong>.</p>
        </header>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Book Appointment">
           <p className="text-text-secondary mb-4">Select a date for your next donation at Aegis Central Bank.</p>
           <form className="space-y-4" onSubmit={async (e) => {
             e.preventDefault();
             try {
               await api.post('/donations', { date: e.target.date.value });
               setIsModalOpen(false);
               alert("Appointment booked!");
             } catch(err) {
               console.error(err);
               alert("Booking failed");
             }
           }}>
              <input type="date" name="date" required className="w-full h-11 px-4 rounded-md border border-text-primary/10 bg-surface-muted" />
              <Button type="submit" className="w-full">Confirm Booking</Button>
           </form>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="md:col-span-2 bg-accent-main text-white p-8 rounded-3xl shadow-editorial relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Heart className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                 <h2 className="text-2xl font-editorial mb-2">You've saved 9 lives.</h2>
                 <p className="text-white/80 max-w-sm mb-8">Your recent donation was dispatched to City General Hospital for an emergency surgery.</p>
                 <Button className="bg-white text-accent-main hover:bg-white/90" onClick={() => setIsModalOpen(true)}>Book Next Appointment</Button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-text-primary/5 flex flex-col justify-center items-center text-center">
              <div className="text-sm text-text-secondary uppercase tracking-wider mb-2">Blood Group</div>
              <div className="text-6xl font-editorial text-accent-main">O-</div>
              <div className="mt-4 px-3 py-1 bg-status-warning-bg text-status-warning text-xs font-medium rounded-full">
                High Demand
              </div>
           </div>
        </div>

        <h3 className="text-xl font-editorial mb-6">Donation History</h3>
        <div className="bg-white rounded-2xl border border-text-primary/5 overflow-hidden">
           <table className="w-full text-left text-sm">
             <thead className="bg-surface-muted text-text-secondary">
               <tr>
                 <th className="px-6 py-4 font-medium">Date</th>
                 <th className="px-6 py-4 font-medium">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-text-primary/5">
                {loading ? (
                  <tr><td colSpan="2" className="px-6 py-4 text-center">Loading...</td></tr>
                ) : donations.length === 0 ? (
                  <tr><td colSpan="2" className="px-6 py-4 text-center">No donations found.</td></tr>
                ) : (
                  donations.map(donation => (
                    <tr key={donation.id}>
                       <td className="px-6 py-4">{new Date(donation.date).toLocaleDateString()}</td>
                       <td className="px-6 py-4"><span className="text-status-success font-medium capitalize">{donation.status}</span></td>
                    </tr>
                  ))
                )}
             </tbody>
           </table>
        </div>
      </Container>
    </div>
  );
}
