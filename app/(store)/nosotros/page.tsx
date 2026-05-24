import Link from "next/link";
import Image from "next/image";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HERO */}
        <header className="space-y-4">
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
        <section className="text-lg md:text-2xl text-slate-700 leading-relaxed max-w-4xl">
          Somos una tienda especializada en tecnología de alta gama importada desde Estados Unidos. 
          Ofrecemos accesorios originales y dispositivos 100% legales, tanto sellados como open box, 
          homologados por el MTC y registrados en Lista Blanca ante OSIPTEL. 
          Apostamos por una experiencia transparente, segura y confiable.
        </section>

        {/* VISUAL - Maximizada dentro de max-w-7xl */}
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

        {/* NODO CENTRAL */}
        <section className="bg-[#E0F7FF] border-l-8 border-[#3098b3] p-4">
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