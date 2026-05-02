import { SectionReveal } from "./SectionReveal";
import { Phone, Mail, Globe, MapPin, ArrowRight } from "lucide-react";

export function ContactCTA() {
  return (
    <section className="relative flex min-h-screen snap-center flex-col justify-center overflow-hidden bg-brand-navy-deep pt-16 text-white md:pt-0">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-[40rem] w-[40rem] -translate-y-1/2 translate-x-1/3 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          <SectionReveal variant="slideLeft">
            <h2 className="font-display text-4xl font-bold md:text-6xl text-balance uppercase">
              Let’s Power Your <span className="text-accent">Future</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-lg">
              Together we keep India running — contact us for a free consultation
            </p>

            <div className="mt-12 space-y-8">
              <div className="font-display text-xl font-bold flex items-center gap-2">
                <span>📞</span> Contact Options
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Phone</div>
                    <div className="text-lg font-medium">+91 99249 68777</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Email</div>
                    <div className="text-lg font-medium">sales@adityagenset.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-white/50">Website</div>
                    <div className="text-lg font-medium">www.adityagenset.com</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal variant="slideRight" delay={150}>
            <div className="rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-md lg:p-10">
              <div className="mb-8 font-display text-xl font-bold flex items-center gap-2">
                <span>📍</span> Addresses
              </div>
              
              <div className="space-y-10">
                <div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-1 shrink-0 text-accent" />
                    <div>
                      <div className="font-display text-lg font-bold">Manufacturing Unit</div>
                      <div className="mt-2 text-sm text-white/70 leading-relaxed">
                        Plot No.29A/B, Survey No.208,<br />
                        Govt Ind. Estate, Phase 2, Pipariya,<br />
                        Silvassa – 396230
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-white/10" />
                
                <div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-1 shrink-0 text-accent" />
                    <div>
                      <div className="font-display text-lg font-bold">Corporate Office</div>
                      <div className="mt-2 text-sm text-white/70 leading-relaxed">
                        Shop No.53, 2nd Floor,<br />
                        Aakash Business Centre,<br />
                        Piplod, Surat – 395007, Gujarat
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/50 italic">
                  "We Stand When Power Sleeps!"
                </div>
              </div>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
