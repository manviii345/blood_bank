import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Awareness() {
  const pastDonors = [
    { name: "Michael T.", bloodGroup: "O+", date: "2 days ago" },
    { name: "Sarah C.", bloodGroup: "A-", date: "4 days ago" },
    { name: "David R.", bloodGroup: "B+", date: "1 week ago" },
    { name: "Emily L.", bloodGroup: "O-", date: "2 weeks ago" },
    { name: "James H.", bloodGroup: "AB+", date: "2 weeks ago" },
    { name: "Anita K.", bloodGroup: "A+", date: "3 weeks ago" },
  ];

  return (
    <div className="py-20 bg-surface min-h-screen">
      <Container className="max-w-[800px] text-center mb-20">
        <h1 className="text-5xl font-editorial mb-8">Every drop counts.</h1>
        <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
          A single donation can save up to three lives. Join our network of verified donors and receive real-time updates on the impact you are making in your community.
        </p>
        <Link to="/register">
          <Button size="lg">Become a Donor Today</Button>
        </Link>
      </Container>

      <Container className="max-w-[1000px]">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="text-accent-main w-6 h-6" />
          <h2 className="text-3xl font-editorial">Donor Wall of Honor</h2>
        </div>
        <p className="text-text-secondary mb-8">Recognizing the silent heroes who recently contributed to the Aegis central reserve.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastDonors.map((donor, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-text-primary/5 shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">{donor.name}</div>
                <div className="text-xs text-text-secondary mt-1">Donated {donor.date}</div>
              </div>
              <div className="w-10 h-10 bg-accent-muted text-accent-main rounded-full flex items-center justify-center font-editorial font-medium">
                {donor.bloodGroup}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
