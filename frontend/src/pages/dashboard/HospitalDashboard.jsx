import { useState, useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import api from "../../lib/api";

export function HospitalDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.get('/requests')
      .then(res => setRequests(res.data.data))
      .catch(err => console.error("Failed to load requests", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 bg-surface min-h-screen">
      <Container>
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-editorial tracking-tight text-text-primary">Blood Requests</h1>
            <p className="text-text-secondary mt-2">Create and track emergency and routine requests.</p>
          </div>
          <Button className="bg-text-primary text-white hover:bg-text-secondary" onClick={() => setIsModalOpen(true)}>New Request</Button>
        </header>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Blood Request">
           <p className="text-text-secondary mb-4">Select blood group and urgency to issue a request to the central Aegis bank.</p>
           <form className="space-y-4" onSubmit={async (e) => {
             e.preventDefault();
             const bg = e.target.bloodGroup.value;
             const qty = e.target.quantity.value;
             try {
               await api.post('/requests', { blood_group: bg, quantity_units: qty, urgency: 'high' });
               setIsModalOpen(false);
               const res = await api.get('/requests');
               setRequests(res.data.data);
               alert("Request submitted successfully!");
             } catch(err) {
               console.error(err);
               alert("Failed to submit request");
             }
           }}>
              <select name="bloodGroup" required className="w-full h-11 px-4 rounded-md border border-text-primary/10 bg-surface-muted">
                 <option value="">Select Blood Group</option>
                 <option value="O+">O+</option>
                 <option value="O-">O-</option>
                 <option value="A+">A+</option>
                 <option value="A-">A-</option>
                 <option value="B+">B+</option>
                 <option value="B-">B-</option>
                 <option value="AB+">AB+</option>
                 <option value="AB-">AB-</option>
              </select>
              <input type="number" name="quantity" required min="1" placeholder="Quantity (Units)" className="w-full h-11 px-4 rounded-md border border-text-primary/10 bg-surface-muted" />
              <Button type="submit" className="w-full">Submit Request</Button>
           </form>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 bg-white rounded-3xl border border-text-primary/5 p-8 shadow-sm">
             <h3 className="text-xl font-editorial mb-6">Active Requests</h3>
             
             {loading ? (
                <div className="text-center text-text-secondary py-12">Loading requests...</div>
             ) : requests.length === 0 ? (
               <div className="py-12 text-center text-text-secondary border-2 border-dashed border-text-primary/10 rounded-2xl">
                 <p>No active requests found.</p>
                 <Button variant="outline" className="mt-4" onClick={() => alert("New request form coming soon!")}>Create your first request</Button>
               </div>
             ) : (
               <div className="space-y-4">
                  {requests.map(req => (
                    <div key={req.id} className={`p-4 border rounded-xl flex justify-between items-center ${req.urgency === 'high' || req.urgency === 'critical' ? 'border-status-warning-bg bg-status-warning-bg/30' : 'border-text-primary/5'}`}>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">Request #{req.id.substring(0, 8)}</span>
                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${req.urgency === 'high' || req.urgency === 'critical' ? 'bg-status-warning text-white' : 'bg-surface-muted text-text-secondary'}`}>
                              {req.urgency}
                            </span>
                          </div>
                          <div className="text-xs text-text-secondary">Blood Group: {req.blood_group} | Quantity: {req.quantity_units} Units</div>
                       </div>
                       <div className="text-right">
                          <div className="text-sm font-medium text-text-primary capitalize">{req.status}</div>
                       </div>
                    </div>
                  ))}
               </div>
             )}
           </div>

           <div className="bg-surface-muted rounded-3xl border border-text-primary/5 p-8 text-center flex flex-col justify-center items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <span className="text-2xl font-editorial text-accent-main">O-</span>
              </div>
              <h4 className="font-medium mb-2">Universal Donor Shortage</h4>
              <p className="text-sm text-text-secondary">The central bank is currently low on O- inventory. Please reserve requests for critical emergencies only.</p>
           </div>
        </div>
      </Container>
    </div>
  );
}
