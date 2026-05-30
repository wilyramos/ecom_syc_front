import Link from "next/link";
import Image from "next/image";

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.7 1.1l1 3.6c.1.5.5.8 1 .8H7l-1.4 4.2c-.1.4 0 .8.3 1l2.1 1.4c.3.2.7.2 1-.1L12 15l4.4 2.8c.4.3.9.2 1.2-.1.3-.3.4-.7.2-1.1z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ScanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

const steps = [
  {
    num: "01",
    icon: <PlaneIcon />,
    title: "Importación",
    desc: "Directo desde operadores y tiendas oficiales de EE.UU.",
  },
  {
    num: "02",
    icon: <ShieldCheckIcon />,
    title: "Regulación",
    desc: "Homologados por el MTC y registrados en OSIPTEL.",
    badge: true,
  },
  {
    num: "03",
    icon: <ScanIcon />,
    title: "Revisión",
    desc: "Control técnico individual. 1 año de garantía incluido.",
  },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ── HERO ── */}
      <header className="bg-[#000000] px-6 sm:px-20 py-20 sm:py-28">
        <div className="max-w-screen-2xl mx-auto">

          {/* Fila superior: título a la izquierda, descripción a la derecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20 items-end">
            <h1 className="text-5xl sm:text-7xl font-black uppercase text-white leading-none tracking-tight">
              Smartphones<br />
              <span className="text-[#3098b3]">originales.</span>
            </h1>
            <p className="text-slate-300 text-base leading-relaxed sm:pb-2">
              Somos una tienda especializada en tecnología de alta gama importada desde Estados Unidos.
              Ofrecemos accesorios originales y dispositivos 100% legales, tanto sellados como open box,
              homologados por el MTC y registrados en Lista Blanca ante OSIPTEL.
              Apostamos por una experiencia transparente, segura y confiable.
            </p>
          </div>

          {/* Firma */}
          <p className="text-sm text-slate-500 mt-10 border-t border-white/10 pt-6">
            S&C Mobile.
          </p>

        </div>
      </header>

      
      {/* ── IMAGEN LISTA BLANCA ── */}
      <section className="max-w-screen-2xl mx-auto ">
        <div className="overflow-hidden">
          <Image
            src="/lista-blanca.webp"
            alt="Certificación Lista Blanca OSIPTEL"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
            priority
            unoptimized
          />
        </div>
      </section>

      {/* ── PROCESO ── */}
<section className="bg-[#000000] px-6 sm:px-20 py-16 sm:py-24">
  <div className="max-w-screen-2xl mx-auto">
    <p className="text-base uppercase tracking-widest text-[#3098b3] mb-10">
      Cómo trabajamos
    </p>
    <div className="flex flex-col gap-1">
      {steps.map((step) => (
        <div
          key={step.num}
          className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-7 border-b border-white/5 last:border-0"
        >
          {/* Cabecera del paso en móviles (Número + Icono + Título) */}
          <div className="flex items-center gap-4 md:gap-6 min-w-0 md:shrink-0">
            <span className="text-lg font-bold text-white/20 w-5 shrink-0 tabular-nums">
              {step.num}
            </span>
            <div className="text-[#3098b3] shrink-0">{step.icon}</div>
            <h3 className="text-white font-bold text-base sm:text-lg md:w-28 shrink-0">
              {step.title}
            </h3>
          </div>

          {/* Línea divisoria decorativa (Solo visible en pantallas grandes) */}
          <div className="hidden md:block h-px flex-1 bg-white/5" />

          {/* Contenido principal (Descripción + Badge) */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto md:shrink-0">
            <p className="text-slate-500 text-md md:text-xl leading-relaxed md:w-80">
              {step.desc}
            </p>
            <div className="w-[70px] shrink-0 flex justify-end">
              {step.badge ? (
                <Image
                  src="/logomtcositeptel.png"
                  alt="MTC OSIPTEL"
                  width={70}
                  height={35}
                  className="object-contain opacity-70"
                  unoptimized
                />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ── CTA ── */}
      <section className="border-t border-slate-100 px-6 sm:px-20 py-16 sm:py-24">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase leading-tight">
              ¿Es legal tu celular?
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Verifícalo gratis en OSIPTEL.
            </p>
          </div>
          <Link
            href="https://checacelnoregistrado.osiptel.gob.pe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#3098b3] hover:bg-[#00B2D6] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 transition-colors duration-200 whitespace-nowrap"
          >
            Verificar en OSIPTEL
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

    </main>
  );
}