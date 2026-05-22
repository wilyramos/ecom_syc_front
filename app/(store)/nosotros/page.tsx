// File: frontend/app/nosotros/page.tsx

import {
  ShieldCheck,
  Scale,
  Cpu,
  AlertTriangle,
  MapPin, ArrowRight,
  BadgeCheck,
  Truck
} from "lucide-react";

export default function NosotrosPage() {
  return (
    <div
      className="relative min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}
    >

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden border-b border-border">

        {/* Fondo decorativo — grid lines sutiles */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-default) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-default) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Bloque de color acento — lateral izquierdo */}
        <div
          className="absolute left-0 top-0 h-full w-1"
          style={{ backgroundColor: "var(--color-accent)" }}
        />

        <div className="max-w-5xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* ── Columna izquierda: texto ── */}
            <div className="flex flex-col gap-6">
             

              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-foreground"
                style={{ letterSpacing: "-0.03em" }}
              >
                Smartphones originales.
                <br />
                <span style={{ color: "var(--color-accent)" }}>Sin letra chica.</span>
              </h1>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Vendemos equipos 100&nbsp;% legales, homologados por el MTC y con
                IMEI registrado ante OSIPTEL. Porque una buena compra empieza por
                saber exactamente qué estás adquiriendo.
              </p>

              {/* Garantías */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: BadgeCheck, label: "Originales" },
                  { icon: ShieldCheck, label: "Homologados MTC" },
                  { icon: Truck, label: "Envíos nacionales" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border"
                    style={{
                      borderColor: "var(--color-border-default)",
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <Icon size={13} style={{ color: "var(--color-accent)" }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Columna derecha: dirección + mapa ── */}
            <div className="flex flex-col gap-4">
              {/* Dirección */}
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: "var(--color-accent-light)",
                    color: "var(--color-accent)",
                  }}
                >
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground" style={{ letterSpacing: "-0.01em" }}>
                    San Vicente de Cañete
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
                    Av. Mariscal Benavides 713, Lima — Perú
                  </p>
                </div>
              </div>

              {/* Mapa iframe */}
              <div
                className="w-full rounded-xl overflow-hidden border shadow-xs"
                style={{ borderColor: "var(--color-border-default)", height: "300px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.4!2d-76.378026!3d-13.0751543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ff91c690bec53%3A0xc4cf99c4e2a85b45!2sSYC%20Mobile%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación SYC Mobile Perú — San Vicente de Cañete"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PROCESO — TRES COLUMNAS LIMPIAS ══ */}
      <section
        className="py-20 border-b border-border"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <div className="mb-12">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              Nuestro proceso
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              De origen a tus manos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden border border-border">
            {[
              {
                num: "01",
                icon: Cpu,
                title: "Importación legal",
                body: "Adquirimos equipos de distribuidoras globales certificadas, vinculadas directamente con operadores y tiendas oficiales internacionales.",
              },
              {
                num: "02",
                icon: Scale,
                title: "Homologación MTC",
                body: "Cada modelo porta su certificado de homologación del MTC y pasa por fiscalización de aduanas antes de ingresar al mercado nacional.",
              },
              {
                num: "03",
                icon: ShieldCheck,
                title: "Control de calidad",
                body: "Hardware, software y batería son evaluados en nuestro laboratorio. Ese proceso respalda el año de garantía que entregamos con cada equipo.",
                accent: true,
              },
            ].map(({ num, icon: Icon, title, body, accent }) => (
              <div
                key={num}
                className="relative p-7 flex flex-col gap-4"
                style={{ backgroundColor: "var(--color-bg-primary)" }}
              >
                {/* Número decorativo */}
                <span
                  className="absolute top-5 right-6 text-5xl font-black select-none"
                  style={{
                    color: accent
                      ? "var(--color-accent-light)"
                      : "var(--color-bg-tertiary)",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </span>

                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: accent
                      ? "var(--color-accent-light)"
                      : "var(--color-bg-tertiary)",
                  }}
                >
                  <Icon
                    size={17}
                    style={{
                      color: accent
                        ? "var(--color-accent)"
                        : "var(--color-text-secondary)",
                    }}
                  />
                </div>

                <div>
                  <h3
                    className="font-bold text-sm mb-1.5 text-foreground"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALERTA OSIPTEL ══ */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          {/* Card alerta */}
          <div
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--color-border-default)" }}
          >
            {/* Header rojo */}
            <div
              className="flex items-center gap-3 px-7 py-4"
              style={{ backgroundColor: "var(--color-error)", color: "#fff" }}
            >
              <AlertTriangle size={18} />
              <span className="text-sm font-bold uppercase tracking-wide">
                ¡Cuidado donde compras tu celular!
              </span>
            </div>

            <div
              className="p-7 space-y-6"
              style={{ backgroundColor: "var(--color-bg-primary)" }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                Exige siempre que tu equipo esté inscrito en la{" "}
                <strong className="text-foreground">Lista Blanca de OSIPTEL</strong>.
                Sin ese registro, tu teléfono puede quedar bloqueado
                definitivamente y sin señal en cualquier operadora peruana.
              </p>

              {/* Lista de causas */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 rounded-lg"
                style={{ backgroundColor: "var(--color-error-light)" }}
              >
                <p
                  className="col-span-full text-[11px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-error)" }}
                >
                  Causas de bloqueo definitivo
                </p>
                {[
                  "Reportado como robado, perdido o sustraído",
                  "IMEI alterado, inválido o clonado",
                  "No registrado en RENTESEG",
                  "Excede la cantidad máxima de internamiento de ley",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-primary)" }}>
                    <span className="mt-0.5 font-black" style={{ color: "var(--color-error)" }}>—</span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t"
                style={{ borderColor: "var(--color-border-subtle)" }}
              >
                <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                  Todos nuestros equipos cumplen estrictamente la normativa peruana.
                </p>
                <a
                  href="https://www.osiptel.gob.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold hover:underline underline-offset-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  Conoce el RENTESEG <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}