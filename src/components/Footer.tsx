
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 text-white p-2 rounded-lg">
                <span className="font-bold text-xl">UB</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">UMKM Banjarbaru</h3>
                <p className="text-sm text-gray-400">Marketplace Lokal</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Platform digital yang menghubungkan UMKM Banjarbaru dengan konsumen untuk mendukung ekonomi lokal dan produk berkualitas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cara Berbelanja</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kategori Produk</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Makanan Khas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kerajinan Tangan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fashion Lokal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Oleh-oleh</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dekorasi Rumah</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak Kami</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">
                    Jl. A. Yani Km 33, Banjarbaru<br />
                    Kalimantan Selatan 70714
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500" />
                <p className="text-gray-400">+62 511 4772234</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <p className="text-gray-400">info@umkmbanjarbaru.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 UMKM Banjarbaru. Semua hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Didukung oleh:</span>
            <span className="bg-emerald-600 px-3 py-1 rounded text-sm font-medium">
              Pemkot Banjarbaru
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
