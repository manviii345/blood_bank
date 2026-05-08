import { motion } from "framer-motion";
import { ArrowRight, Activity, Droplets, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Link } from "react-router-dom";
import { HeartAnimation } from "@/components/ui/HeartAnimation";
export function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--color-accent-muted),_transparent_40%)] opacity-70" />
        <Container className="relative z-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column - Editorial Typography */}
            <div className="lg:col-span-7 flex flex-col space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >

                <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-text-primary/5 rounded-full px-4 py-1.5 mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-status-success"></span>
                  <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">System Operational</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-editorial leading-[0.95] tracking-tight text-text-primary">
                  The lifeblood <br />
                  <span className="text-text-secondary">of modern</span> <br />
                  healthcare.
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl"
              >
                <p className="text-lg text-text-secondary leading-relaxed">
                  Aegis provides absolute reliability in blood inventory management. 
                  We connect donors, hospital networks, and blood banks through an 
                  intelligent, real-time infrastructure.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link to="/register">
                  <Button size="lg" className="group">
                    Become a Donor
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/availability">
                  <Button variant="outline" size="lg">
                    Check Availability
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Column - Asymmetrical Metric Cards */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/30 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 z-0 flex items-center justify-center -translate-y-10 scale-150 pointer-events-none">
                <HeartAnimation />
              </div>
              <div className="relative z-10 flex flex-col gap-6">
                {/* <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-8 rounded-2xl shadow-editorial border border-text-primary/5 ml-12"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-full bg-accent-muted flex items-center justify-center text-accent-main">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-text-secondary bg-surface-muted px-2 py-1 rounded">Live</span>
                  </div>
                  <h3 className="font-editorial text-4xl mb-2">2,408</h3>
                  <p className="text-sm text-text-secondary">Units available in network</p>
                </motion.div> */}
{/* 
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-text-primary text-white p-8 rounded-2xl shadow-editorial mr-12"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-editorial text-4xl mb-2">1.2s</h3>
                  <p className="text-sm text-white/70">Average emergency response time</p>
                </motion.div> */}
{/* 
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-surface-muted p-8 rounded-2xl border border-text-primary/5 ml-24"
                >
                   <div className="flex items-center space-x-3 mb-4">
                    <ShieldCheck className="h-5 w-5 text-status-success" />
                    <span className="text-sm font-medium">Verified Source</span>
                   </div>
                   <p className="text-sm text-text-secondary">All transfers are secured and logged on our encrypted relational architecture.</p>
                </motion.div> */}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Trust & Architecture Section */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-editorial mb-8">Architected for <br/>absolute precision.</h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                In healthcare, data integrity is not a feature—it is a requirement. Our system leverages robust relational database concepts to ensure that inventory is always accurate, requests are instantly validated, and expirations are monitored in real-time.
              </p>
              <Button variant="outline">View Architecture</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                <div className="h-0.5 w-8 bg-accent-main"></div>
                <h4 className="text-xl font-medium">Relational Integrity</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Every unit of blood is tied to a specific donation and donor, ensuring complete traceability.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="h-0.5 w-8 bg-text-primary"></div>
                <h4 className="text-xl font-medium">Real-time Validation</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Hospital requests are instantly checked against available stock to prevent false commitments.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="h-0.5 w-8 bg-text-primary"></div>
                <h4 className="text-xl font-medium">Automated Expiry</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  The system automatically flags and updates the status of units past their 35-day shelf life.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="h-0.5 w-8 bg-text-primary"></div>
                <h4 className="text-xl font-medium">Role-based Auth</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Strict access control for Staff, Super Admins, Hospitals, and Donors ensures privacy.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
