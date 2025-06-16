
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Kue Apam Barabai Khas Kalimantan Selatan Premium",
      price: "Rp 25.000",
      originalPrice: "Rp 30.000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 127,
      store: "Apam Barabai Bu Siti",
      discount: "-17%",
      location: "Banjarbaru Utara"
    },
    {
      id: 2,
      name: "Kerajinan Tas Anyam Pandan Tradisional Banjar",
      price: "Rp 150.000",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 85,
      store: "Kerajinan Banjar Asli",
      location: "Banjarbaru Selatan"
    },
    {
      id: 3,
      name: "Dodol Kandangan Original Khas Kalsel 500gr",
      price: "Rp 35.000",
      originalPrice: "Rp 40.000",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 203,
      store: "Dodol Kandangan Pak Ahmad",
      discount: "-13%",
      location: "Banjarbaru Tengah"
    },
    {
      id: 4,
      name: "Batik Sasirangan Motif Tradisional Kalimantan",
      price: "Rp 275.000",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 94,
      store: "Batik Sasirangan Heritage",
      location: "Banjarbaru Barat"
    },
    {
      id: 5,
      name: "Kerupuk Ikan Haruan Khas Banjar Crispy",
      price: "Rp 18.000",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      store: "Kerupuk Haruan Bu Mariam",
      location: "Banjarbaru Timur"
    },
    {
      id: 6,
      name: "Souvenir Miniatur Rumah Bubungan Tinggi",
      price: "Rp 85.000",
      originalPrice: "Rp 95.000",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop",
      rating: 4.5,
      reviews: 67,
      store: "Souvenir Banjar Craft",
      discount: "-11%",
      location: "Banjarbaru Utara"
    },
    {
      id: 7,
      name: "Kopi Robusta Meratus Premium Roasted 250gr",
      price: "Rp 45.000",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 234,
      store: "Kopi Meratus Specialty",
      location: "Banjarbaru Selatan"
    },
    {
      id: 8,
      name: "Amplang Ikan Tenggiri Renyah Khas Banjar",
      price: "Rp 22.000",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      store: "Amplang Tenggiri Asli",
      location: "Banjarbaru Tengah"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Produk Terlaris
            </h2>
            <p className="text-gray-600">
              Produk pilihan terbaik dari UMKM Banjarbaru
            </p>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium">
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load more button */}
        <div className="text-center mt-8">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Muat Lebih Banyak Produk
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
