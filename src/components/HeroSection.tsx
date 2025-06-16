
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Selamat Datang di UMKM Banjarbaru",
      subtitle: "Temukan produk terbaik dari pengusaha lokal",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&h=400&fit=crop",
      cta: "Belanja Sekarang"
    },
    {
      id: 2,
      title: "Makanan Khas Kalimantan Selatan",
      subtitle: "Nikmati kelezatan kuliner tradisional",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&h=400&fit=crop",
      cta: "Lihat Menu"
    },
    {
      id: 3,
      title: "Kerajinan Tangan Berkualitas",
      subtitle: "Dukung kreativitas pengrajin lokal",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop",
      cta: "Jelajahi Koleksi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-800 overflow-hidden">
      <div className="relative h-96 md:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            <div
              className="h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.7), rgba(5, 150, 105, 0.7)), url(${slide.image})`,
              }}
            >
              <div className="container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
                    {slide.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg animate-scale-in"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
