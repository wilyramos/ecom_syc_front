import Link from "next/link";
import Image from "next/image";

// Icons inline (no dependency needed)
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.7 1.1l1 3.6c.1.5.5.8 1 .8H7l-1.4 4.2c-.1.4 0 .8.3 1l2.1 1.4c.3.2.7.2 1-.1L12 15l4.4 2.8c.4.3.9.2 1.2-.1.3-.3.4-.7.2-1.1z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const steps = [
  {
    num: "01",
    icon: <PlaneIcon />,
    title: "Origen",
    desc: "Nuestros celulares son importados de distribuidores internacionales, principalmente de operadores móviles y tiendas oficiales del extranjero.",
  },
  {
    num: "02",
    icon: <ShieldCheckIcon />,
    title: "Regulación",
    desc: "Todos nuestros celulares están homologados por el Ministerio de Transportes y Comunicaciones (MTC) y registrados en OSIPTEL.",
    badge: true,
  },
  {
    num: "03",
    icon: <ScanIcon />,
    title: "Recepción y Revisión Técnica",
    label: "¡Llegaron al Perú!",
    desc: "Cada celular pasa por una revisión técnica rigurosa para garantizar su óptimo funcionamiento y ofrecer 1 año de garantía.",
  },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16 divide-y-2 divide-gray-100">

        {/* HERO */}
        <header className="space-y-2">
          <h1 className="text-5xl md:text-8xl font-extrabold uppercase tracking-tight leading-[0.9]">
            Smartphones
            <br />
            <span className="text-[#3098b3]">Originales</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-500 uppercase tracking-widest">
            Originales, accesibles y confiables.
          </p>
        </header>

        {/* DESCRIPCIÓN */}
        <section className="text-lg md:text-2xl text-slate-700 leading-relaxed max-w-7xl">
          Somos una tienda especializada en tecnología de alta gama importada desde Estados Unidos.
          Ofrecemos accesorios originales y dispositivos 100% legales, tanto sellados como open box,
          homologados por el MTC y registrados en Lista Blanca ante OSIPTEL.
          Apostamos por una experiencia transparente, segura y confiable.
        </section>

        {/* VISUAL */}
        <section className="w-full">
          <Image
            src="/lista-blanca.webp"
            alt="Certificación Lista Blanca"
            width={1400}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </section>

        {/* PROCESO */}
        <section className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase text-[#3098b3]">
            Nuestro Proceso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-200">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative p-8 flex flex-col gap-5 ${i < steps.length - 1
                    ? "border-b md:border-b-0 md:border-r border-slate-200"
                    : ""
                  }`}
              >
                {/* Número de fondo decorativo */}
                <span className="absolute top-4 right-5 text-7xl font-black text-slate-100 select-none leading-none">
                  {step.num}
                </span>

                {/* Icono */}
                <div className="text-[#3098b3] z-10">{step.icon}</div>

                {/* Badge opcional */}
                {step.label && (
                  <span className="inline-block self-start bg-[#3098b3] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 z-10">
                    {step.label}
                  </span>
                )}

                {/* Logo MTC en el paso de Regulación */}
                {step.badge && (
                  <div className="z-10">
                    <Image
                      src="/logomtcositeptel.png"
                      alt="Logo MTC"
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 z-10">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed z-10">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Línea de conexión decorativa (solo desktop) */}
          <div className="hidden md:flex items-center justify-between px-[calc(100%/6-1rem)] mt-2">
            {[0, 1].map((_, i) => (
              <div key={i} className="flex-1 h-px bg-[#3098b3] mx-4 relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#3098b3] font-bold">›</span>
              </div>
            ))}
          </div>
        </section>

        {/* NODO CENTRAL */}
        <section className="bg-[#E0F7FF] border-l-8 border-[#3098b3] p-8">
          <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8 text-slate-900">
            Garantía de Legalidad
          </h2>
          <div className="space-y-8">
            <p className="text-slate-700 text-lg md:text-xl max-w-3xl">
              Puedes verificar la legalidad de cualquier dispositivo.
            </p>
            <Link
              href="https://checacelnoregistrado.osiptel.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#3098b3] text-white px-10 py-4 font-bold text-lg transition-transform hover:scale-105 hover:bg-[#00B2D6]"
            >
              Verificar en OSIPTEL →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}