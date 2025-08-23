import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { HeroSection } from "@/components/sections/hero";
import { ComoFuncionaSection } from "@/components/sections/como-funciona";
import { CategoriasSection } from "@/components/sections/categorias";
import { EstadisticasSection } from "@/components/sections/estadisticas";
import { ContactoSection } from "@/components/sections/contacto";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ComoFuncionaSection />
        <CategoriasSection />
        <EstadisticasSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
}
