import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null;
  category: string | null;
  store: {
    name: string;
    address: string | null;
  };
  rating?: number; // For UI compatibility with ProductCard
  reviews?: number; // For UI compatibility with ProductCard
  location?: string; // For UI compatibility with ProductCard
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Search in product names and descriptions
        const { data, error } = await supabase
          .from('products')
          .select(`
            id, 
            name, 
            price, 
            image_url, 
            description, 
            category,
            store:store_id(name, address)
          `)
          .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
          .eq('is_active', true);

        if (error) throw error;

        // Transform data to match ProductCard component expectations
        const formattedProducts = data.map((product: any) => ({
          ...product,
          price: `Rp ${product.price.toLocaleString('id-ID')}`,
          rating: 4.5, // Default rating for now
          reviews: 10, // Default reviews for now
          location: product.store?.address?.split(',')[0] || 'Banjarbaru',
          store: product.store?.name || 'Toko UMKM'
        }));

        setProducts(formattedProducts);
      } catch (err: any) {
        console.error('Error fetching search results:', err);
        setError('Gagal memuat hasil pencarian. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Hasil Pencarian: {query}
          </h1>
          <p className="text-gray-600">
            {loading
              ? 'Mencari produk...'
              : `Ditemukan ${products.length} produk untuk pencarian "${query}"`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              Tidak ada produk yang ditemukan
            </h2>
            <p className="text-gray-500 mb-6">
              Coba gunakan kata kunci lain atau periksa ejaan Anda
            </p>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="mx-auto"
            >
              Kembali
            </Button>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;