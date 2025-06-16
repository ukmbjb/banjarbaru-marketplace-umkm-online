
import { Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel Administrator</h1>
            <p className="text-gray-600">Kelola pengguna dan toko UMKM Banjarbaru</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
