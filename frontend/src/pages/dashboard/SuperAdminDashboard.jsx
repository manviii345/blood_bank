import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Droplets, AlertTriangle } from "lucide-react";
import { Container } from "../../components/ui/Container";
import api from "../../lib/api";

export function SuperAdminDashboard() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/inventory')
      .then(res => setInventory(res.data.data))
      .catch(err => console.error("Failed to fetch inventory for dashboard", err))
      .finally(() => setLoading(false));
  }, []);

  // Calculate max for the chart visualization
  const maxQuantity = Math.max(...inventory.map(i => i.quantity_ml), 50000);

  return (
    <div className="py-12 bg-surface min-h-screen">
      <Container>
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-editorial tracking-tight text-text-primary">System Overview</h1>
            <p className="text-text-secondary mt-2">Strategic monitoring of the entire Aegis network.</p>
          </div>
          <div className="text-sm font-medium px-3 py-1 bg-white border border-text-primary/5 rounded-md shadow-sm">
            Super Admin
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
             { title: "Total Inventory", value: "14,592", unit: "Units", icon: Droplets, color: "text-accent-main" },
             { title: "Active Requests", value: "34", unit: "Hospitals", icon: Activity, color: "text-blue-600" },
             { title: "Critical Shortages", value: "2", unit: "Groups", icon: AlertTriangle, color: "text-status-warning" },
             { title: "Registered Donors", value: "48.2k", unit: "Users", icon: Users, color: "text-status-success" }
          ].map((stat, i) => (
             <motion.div 
               key={stat.title}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-white p-6 rounded-2xl shadow-sm border border-text-primary/5 flex flex-col justify-between h-40"
             >
                <div className="flex justify-between items-start">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-3xl font-editorial">{stat.value}</div>
                  <div className="text-xs text-text-secondary uppercase tracking-wider mt-1">{stat.title} ({stat.unit})</div>
                </div>
             </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-text-primary/5 shadow-sm min-h-[400px]">
              <h3 className="text-xl font-editorial mb-6">Inventory by Blood Group</h3>
              <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-text-primary/10">
                 {loading ? (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary text-sm">Loading chart data...</div>
                 ) : (
                   ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bg) => {
                      const item = inventory.find(i => i.blood_group === bg);
                      const qty = item ? item.quantity_ml : 0;
                      const heightPercent = Math.max((qty / maxQuantity) * 100, 5); // min 5% height

                      return (
                        <div key={bg} className="flex flex-col items-center gap-2">
                           <div className="w-12 bg-surface-muted rounded-t-md relative overflow-hidden h-48 group">
                             <div 
                               className="absolute bottom-0 w-full bg-accent-main/80 transition-all duration-1000 group-hover:bg-accent-main"
                               style={{ height: `${heightPercent}%` }}
                             />
                           </div>
                           <span className="text-xs font-medium">{bg}</span>
                        </div>
                      );
                   })
                 )}
              </div>
           </div>
           
           <div className="bg-text-primary text-white rounded-3xl p-8 shadow-editorial">
              <h3 className="text-xl font-editorial mb-6">System Logs</h3>
              <div className="space-y-4">
                 {[1,2,3,4].map((i) => (
                    <div key={i} className="pb-4 border-b border-white/10 last:border-0">
                       <p className="text-xs text-white/50 mb-1">10:42 AM</p>
                       <p className="text-sm">Hospital 'St. Judes' request #442 fulfilled.</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </Container>
    </div>
  );
}
