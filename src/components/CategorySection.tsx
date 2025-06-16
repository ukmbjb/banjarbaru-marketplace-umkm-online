
import { Package, Coffee, Palette, Shirt, Home, Gift } from "lucide-react";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Makanan & Minuman",
      icon: Coffee,
      count: "250+ produk",
      color: "bg-orange-500"
    },
    {
      id: 2,
      name: "Kerajinan Tangan",
      icon: Palette,
      count: "180+ produk",
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Fashion Lokal",
      icon: Shirt,
      count: "320+ produk",
      color: "bg-pink-500"
    },
    {
      id: 4,
      name: "Dekorasi Rumah",
      icon: Home,
      count: "150+ produk",
      color: "bg-blue-500"
    },
    {
      id: 5,
      name: "Oleh-oleh Khas",
      icon: Gift,
      count: "200+ produk",
      color: "bg-green-500"
    },
    {
      id: 6,
      name: "Semua Kategori",
      icon: Package,
      count: "1000+ produk",
      color: "bg-gray-500"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Kategori Produk UMKM
          </h2>
          <p className="text-gray-600">
            Jelajahi berbagai macam produk dari pengusaha lokal Banjarbaru
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
