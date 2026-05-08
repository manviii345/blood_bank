import { Container } from "../components/ui/Container";

export function About() {
  return (
    <div className="py-20 bg-surface min-h-screen">
      <Container className="max-w-[800px]">
        <h1 className="text-5xl font-editorial mb-8">About Aegis</h1>
        <div className="prose prose-lg text-text-secondary mb-12">
          <p className="mb-6">
            Aegis is a modern blood bank operations platform built on the principles of absolute reliability, operational transparency, and healthcare-grade precision. 
          </p>
          <p className="mb-6">
            By connecting donors, blood banks, and hospitals through a unified relational architecture, we ensure that every drop of blood is tracked, every emergency request is fulfilled instantly, and data integrity is never compromised.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-white border border-text-primary/5 rounded-2xl text-center shadow-sm">
            <div className="text-4xl font-editorial text-accent-main mb-2">12k+</div>
            <div className="text-sm font-medium text-text-primary uppercase tracking-wider">Registered Donors</div>
          </div>
          <div className="p-6 bg-white border border-text-primary/5 rounded-2xl text-center shadow-sm">
            <div className="text-4xl font-editorial text-accent-main mb-2">45</div>
            <div className="text-sm font-medium text-text-primary uppercase tracking-wider">Partner Hospitals</div>
          </div>
          <div className="p-6 bg-white border border-text-primary/5 rounded-2xl text-center shadow-sm">
            <div className="text-4xl font-editorial text-accent-main mb-2">100%</div>
            <div className="text-sm font-medium text-text-primary uppercase tracking-wider">Traceability</div>
          </div>
        </div>

        <h2 className="text-3xl font-editorial mb-6">Our Mission</h2>
        <p className="text-lg text-text-secondary leading-relaxed mb-6">
          To eradicate blood shortages by providing a seamless, real-time platform where supply directly meets demand. We believe technology should get out of the way of saving lives, functioning invisibly yet reliably in the background of critical medical infrastructure.
        </p>
      </Container>
    </div>
  );
}
