import Link from "next/link";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-16">
      <div className="max-w-5xl mx-auto space-y-10">

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
        <section className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-4xl">

          Somos una tienda especializada en tecnología de alta Gama  importada desde Estados Unidos . Ofrecemos Accesorios originales y dispositivos 100% legales , tanto sellados como open box , homologados por el MTC y registrados en Lista Blanca ante Opsitel . Apostamos por una experiencia transparente , segura y confiable .
        </section>



        {/* VISUAL */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/lista-blanca.webp"
            alt="Certificación Lista Blanca"
            fill
            className="object-contain"
          />
        </section>

        {/* NODO CENTRAL */}
        <section className="bg-[#E0F7FF]  border-[#3098b3] p-6 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-2 text-slate-900">
            Garantía de Legalidad
          </h2>

          {/* <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 p-6">
              <span className="block font-bold text-[#3098b3] mb-2">
                Homologado
              </span>

              <p className="text-slate-600">
                100% Homologado por el MTC
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6">
              <span className="block font-bold text-[#3098b3] mb-2">
                Registrado
              </span>

              <p className="text-slate-600">
                IMEI habilitado en Lista Blanca OSIPTEL
              </p>
            </div>
          </div> */}

          {/* ENLACE OSIPTEL */}
          <div className="mt-6 border-t border-slate-200">
            <p className="text-slate-600 mb-4">
              Puedes verificar la legalidad de cualquier equipo aquí:
            </p>

            <Link
              href="https://checacelnoregistrado.osiptel.gob.pe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#3098b3] text-white px-6 py-3 font-bold transition-colors hover:bg-[#00B2D6]"
            >
              Verificar en OSIPTEL →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}