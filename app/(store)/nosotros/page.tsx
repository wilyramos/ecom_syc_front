import Link from "next/link";

export default function NosotrosPage() {
  return (
    <main
      className="min-h-screen bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)] font-sans p-6 md:p-12 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/logoblanco.svg')",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.9)"
      }}
    >
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HERO */}
        <header className="border-b border-[var(--color-border-strong)] pb-12">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            SMARTPHONES<br />
            <span style={{ color: "var(--color-accent)" }}>ORIGINALES</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-[var(--color-text-tertiary)] uppercase tracking-wide">
            ORIGINALES, ACCESIBLES Y CONFIABLES.
          </p>
        </header>

        {/* DESCRIPCIÓN */}
        <section className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-4xl">
          Somos una tienda especializada en tecnología de alta gama importada desde Estados Unidos.
          Ofrecemos accesorios originales y dispositivos 100% legales, tanto sellados como open box,
          homologados por el MTC y registrados en Lista Blanca ante OSIPTEL.
          Apostamos por una experiencia transparente, segura y confiable.
        </section>

        {/* NODO CENTRAL */}
        <section className="p-8 md:p-12 border-2" style={{ borderColor: "var(--color-accent)", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-10">Nosotros vendemos Equipo Legítimo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-[var(--color-border-strong)] p-6 text-center font-bold text-xl uppercase">100% Homologado MTC</div>
            <div className="border border-[var(--color-border-strong)] p-6 text-center font-bold text-xl uppercase">IMEI Registrado OSIPTEL</div>
          </div>
        </section>

        {/* ALERTA */}
        <section className="p-10" style={{ backgroundColor: "var(--color-error)" }}>
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 text-[var(--color-text-inverse)]">Alerta: Bloqueo</h2>
          <p className="text-xl font-bold mb-8 max-w-2xl text-[var(--color-text-inverse)]">
            Sin registro en la Lista Blanca OSIPTEL, tu dispositivo será bloqueado.
            Garantizamos equipos 100% legales y blindados.
          </p>
          <Link
            href="https://www.osiptel.gob.pe"
            target="_blank"
            className="inline-block px-8 py-4 font-black uppercase transition-colors"
            style={{ backgroundColor: "var(--color-bg-inverse)", color: "var(--color-text-inverse)" }}
          >
            Verificar Lista Blanca →
          </Link>
        </section>

      </div>
    </main>
  );
}