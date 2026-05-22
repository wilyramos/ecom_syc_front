// File: frontend/app/nosotros/page.tsx

import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div
      className="relative min-h-screen bg-background text-foreground antialiased selection:bg-red-500 selection:text-white"
      style={{ fontFamily: "'Geist', 'DM Sans', system-ui, sans-serif" }}
    >
      {/* ══ HERO SECTION — EDITORIAL STYLING ══ */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-neutral-50/30 dark:to-neutral-900/10">
        {/* Fondo con grilla asimétrica ultra fina */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text-primary) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Texto Principal (Izquierda) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="space-y-3">
               
                <h1
                  className="text-4xl md:text-6xl font-black  leading-[1.05] text-[var(--color-accent)]"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  Smartphones
                  <br />
                  originales.
                </h1>
              </div>

              <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-xl font-normal">
                Vendemos equipos 100% legales, homologados por el MTC y con
                IMEI registrado ante OSIPTEL. Rompemos la informalidad del mercado
                tecnológico con absoluta transparencia.
              </p>

              {/* Tags de Confianza Estilo Tipográfico */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-border max-w-xl">
                {["ORIGINALES CERTIFICADOS", "HOMOLOGADOS MTC", "ENVÍOS ASEGURADOS"].map((label) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground">
                      {label.split(" ")[0]}
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      {label.split(" ").slice(1).join(" ") || "✓"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dirección e Iframe de Mapa Imponente (Derecha) */}
            <div className="lg:col-span-5 w-full flex flex-col gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-900 ">
                <span className="text-[10px] font-bold tracking-widest text-[var(--color-accent)] block mb-0.5">
                  SEDE CENTRAL
                </span>
                <p className="text-base font-black text-foreground ">
                  San Vicente de Cañete
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Av. Mariscal Benavides 713, Lima — Perú
                </p>
              </div>

              <div className="w-full bg-neutral-100 dark:bg-neutral-800 relative group aspect-video max-h-[240px]  ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d918.4!2d-76.378026!3d-13.0751543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910ff91c690bec53%3A0xc4cf99c4e2a85b45!2sSYC%20Mobile%20Per%C3%BA!5e0!3m2!1ses!2spe!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación SYC Mobile Perú"
                  className="absolute inset-0 w-full h-full "
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ PROCESO — SECCIÓN EDITORIAL NUMÉRICA ══ */}
      <section className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
        {/* Spotlights de fondo minimalistas */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="max-w-xl mb-20">
           
            <h2 className="text-4xl md:text-5xl font-black  leading-none">
              De origen legal a tus manos.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-neutral-800 pt-16">
            {[
              {
                num: "01",
                title: "Importación legal",
                body: "Adquirimos lotes masivos directo de distribuidoras globales certificadas, vinculadas con operadores y tiendas oficiales de origen de manera transparente.",
              },
              {
                num: "02",
                title: "Homologación MTC",
                body: "Cada variante exacta ingresa bajo estrictos canales aduaneros portando su certificado de homologación vigente impreso en la declaración oficial.",
              },
              {
                num: "03",
                title: "Control de calidad",
                body: "Evaluamos ciclos de batería, bandas de frecuencia y hardware en laboratorio especializado. Así respaldamos el año de garantía real que firmamos.",
                highlight: true
              },
            ].map(({ num, title, body, highlight }) => (
              <div key={num} className="flex flex-col gap-6 group relative">
                <div className="flex items-baseline justify-between">
                  <span className={`text-6xl font-black  er ${highlight ? "text-red-500" : "text-neutral-800 group-hover:text-neutral-700 transition-colors"}`}>
                    {num}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-lg text-neutral-100 ">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 ">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    {/* ══ ALERTA OSIPTEL — MÁXIMO DRAMATISMO INDUSTRIAL ══ */}
<section className="py-6 md:py-12 bg-background">
  <div className="max-w-7xl mx-auto px-6 md:px-12">

    <div className="relative rounded-lg bg-white dark:bg-black overflow-hidden border border-neutral-200 dark:border-neutral-800">

      {/* Barra lateral de advertencia */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-600" />

      <div className="grid grid-cols-1 lg:grid-cols-12">

        {/* Bloque Izquierdo Mandatario/Impactante */}
        <div className="lg:col-span-5 bg-red-600 text-white p-8 md:p-12 flex flex-col justify-between gap-12">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] bg-black/20 text-red-100 px-3 py-1.5 rounded-md self-start">
            ALERTA OSIPTEL
          </span>
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95]">
              Bloqueo
              <br />
              Inmediato.
            </h2>
            <p className="text-sm text-red-100 leading-relaxed font-light">
              Las disposiciones del RENTESEG en el Perú son obligatorias. Todo terminal móvil que no forme parte del registro centralizado es calificado como inválido y denegado de las redes públicas.
            </p>
          </div>
          <div className="text-xs text-red-200/80 tracking-wide">
            REGULACIÓN: DECRETO SUPREMO N° 007-2019-MTC
          </div>
        </div>

        {/* Contenido Técnico Operativo */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-black text-neutral-900 dark:text-neutral-100 leading-snug">
              Exige siempre la inscripción en la <span className="underline decoration-red-600 decoration-2 underline-offset-4">Lista Blanca</span>. Si el código IMEI no está registrado, el dispositivo perderá acceso a la red móvil.
            </p>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase  text-red-600 block">
                CAUSALES DE BLOQUEO Y DENEGACIÓN DE ACCESOS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Código IMEI reportado como hurtado o extraviado",
                  "IMEI alterado, inválido o lógicamente clonado",
                  "Código ausente en el Registro Nacional (RENTESEG)",
                  "Terminales no homologados previamente ante el MTC",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-xl px-4 py-3.5 flex items-center"
                  >
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sello de Garantía Integrado Limpio */}
          <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-900">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              <strong className=" font-black uppercase tracking-wider text-xs block mb-1">
                Garantía de S&C Mobile.
              </strong>
              Cada número de serie que vendemos está pre-filtrado, verificado y cargado en el sistema centralizado de la Lista Blanca. Tu inversión está blindada por ley.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-xs text-neutral-400">
                Fuente Oficial: osiptel.gob.pe / mtc.gob.pe
              </span>
              <Link
                href="https://www.osiptel.gob.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100 pb-1 hover:text-red-600 hover:border-red-600 transition-all duration-300"
              >
                Verificar RENTESEG Online →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</section>
    </div>
  );
}