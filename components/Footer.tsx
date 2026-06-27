import { Facebook, Instagram, MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import { categories, whatsappLink } from '@/lib/data';

const quickLinks = ['Home', 'Shop', 'About', 'Contact', 'Offers'];
const paymentMethods = ['M-Pesa', 'Visa', 'Mastercard'];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-heading text-2xl font-bold text-white">
              Irene<span className="text-gold">.</span>
            </span>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/50">
              Curating premium, accessible home décor for beautiful Kenyan homes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={whatsappLink('Hi! I have a question.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <span
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 font-accent text-[9px] font-semibold uppercase tracking-tight transition-colors duration-300 hover:bg-gold hover:text-ink"
              >
                TikTok
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="font-body text-sm text-white/50 transition-colors duration-300 hover:text-gold">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Categories
            </h3>
            <ul className="mt-5 space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <a href="#" className="font-body text-sm text-white/50 transition-colors duration-300 hover:text-gold">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-3 font-body text-sm text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Nairobi, Kenya
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-white/50">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                +254 700 000 000
              </li>
              <li className="flex items-start gap-3 font-body text-sm text-white/50">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                hello@irenehousehold.co.ke
              </li>
            </ul>
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Irene Household Collection location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.5!2d36.7172!3d-1.3032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1700000000000"
                width="100%"
                height="140"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="rounded-full border border-white/15 px-4 py-1.5 font-accent text-xs font-medium uppercase tracking-wide text-white/50"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center font-body text-xs text-white/40">
          &copy; 2026 Irene Household Collection. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
