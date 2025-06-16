
import { Search, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useState, FormEvent } from "react";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Melayani Seluruh Banjarbaru & Sekitarnya</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Bantuan</span>
            <span>Tentang Kami</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-emerald-600 text-white p-2 rounded-lg">
              <span className="font-bold text-xl">UB</span>
            </div>
            <div>
              <h1 className="font-bold text-xl text-emerald-600">UMKM Banjarbaru</h1>
              <p className="text-sm text-gray-600">Marketplace Lokal</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={(e: FormEvent) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Cari produk UMKM Banjarbaru..."
                  className="pr-12 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <UserMenu />
            ) : (
              <Button 
                variant="ghost" 
                className="flex flex-col items-center p-2"
                onClick={() => navigate('/auth')}
              >
                <span className="text-xs">Masuk</span>
              </Button>
            )}
            <Button variant="ghost" className="flex flex-col items-center p-2 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Keranjang</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t pt-4">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Beranda
            </button>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Kategori
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Makanan Khas
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Kerajinan
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Fashion
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Promo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
