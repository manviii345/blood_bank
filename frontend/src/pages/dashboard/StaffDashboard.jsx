import { useState, useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";

import api from "../../lib/api";

export function StaffDashboard() {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dRes, rRes] = await Promise.all([
        api.get('/donations'),
        api.get('/requests')
      ]);
      setDonations(dRes.data.data);
      setRequests(rRes.data.data);
    } catch (err) {
      console.error("Failed to load staff data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleRequestStatus = async (id, status) => {
    try {
      await api.put(`/requests/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update request status");
    }
  };

  const handleDonationStatus = async (id, status) => {
    try {
      await api.put(`/donations/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update donation status");
    }
  };

  return (
    <div className="py-12 bg-surface min-h-screen">
      <Container>
        <header className="mb-12">
          <h1 className="text-4xl font-editorial tracking-tight text-text-primary">Staff Operations</h1>
          <p className="text-text-secondary mt-2">Manage inventory requests and donor appointments.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requests Section */}
          <div className="bg-white rounded-3xl border border-text-primary/5 p-8 shadow-sm">
             <h3 className="text-xl font-editorial mb-6">Hospital Requests</h3>
             {loading ? <p>Loading...</p> : (
               <div className="space-y-4">
                 {requests.map(req => (
                   <div key={req.id} className="p-4 border border-text-primary/10 rounded-xl">
                     <div className="flex justify-between mb-2">
                       <span className="font-medium">Request #{req.id.substring(0, 8)}</span>
                       <span className="text-xs uppercase bg-surface-muted px-2 py-1 rounded">{req.status}</span>
                     </div>
                     <div className="text-sm text-text-secondary mb-4">
                       Group: <strong>{req.blood_group}</strong> | Units: {req.quantity_units}
                     </div>
                     {req.status === 'pending' && (
                       <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleRequestStatus(req.id, 'approved')} className="flex-1">Approve</Button>
                         <Button size="sm" variant="outline" onClick={() => handleRequestStatus(req.id, 'rejected')} className="flex-1">Reject</Button>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
          </div>

          {/* Donations Section */}
          <div className="bg-white rounded-3xl border border-text-primary/5 p-8 shadow-sm">
             <h3 className="text-xl font-editorial mb-6">Donor Appointments</h3>
             {loading ? <p>Loading...</p> : (
               <div className="space-y-4">
                 {donations.map(don => (
                   <div key={don.id} className="p-4 border border-text-primary/10 rounded-xl">
                     <div className="flex justify-between mb-2">
                       <span className="font-medium">Apt on {new Date(don.date).toLocaleDateString()}</span>
                       <span className="text-xs uppercase bg-surface-muted px-2 py-1 rounded">{don.status}</span>
                     </div>
                     <div className="text-sm text-text-secondary mb-4">
                       Donor ID: {don.donor_id.substring(0,8)}
                     </div>
                     {don.status === 'scheduled' && (
                       <div className="flex gap-2">
                         <Button size="sm" onClick={() => handleDonationStatus(don.id, 'completed')} className="flex-1">Mark Completed</Button>
                         <Button size="sm" variant="outline" onClick={() => handleDonationStatus(don.id, 'rejected')} className="flex-1">No Show</Button>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </Container>
    </div>
  );
}

