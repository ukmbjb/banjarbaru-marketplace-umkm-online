
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Settings, Store, Package, LogOut, Shield, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'seller':
        return 'Penjual';
      case 'customer':
        return 'Pembeli';
      default:
        return 'Pengguna';
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case 'admin':
        return 'text-red-600';
      case 'seller':
        return 'text-blue-600';
      case 'customer':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex flex-col items-center p-2">
          <User className="w-5 h-5" />
          <span className="text-xs">Akun</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.full_name || user?.email}
            </p>
            <p className={`text-xs leading-none ${getRoleColor()}`}>
              {getRoleLabel()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {role === 'admin' && (
          <DropdownMenuItem onClick={() => navigate('/admin')}>
            <Shield className="mr-2 h-4 w-4" />
            <span>Panel Admin</span>
          </DropdownMenuItem>
        )}
        
        {role === 'seller' && (
          <>
            <DropdownMenuItem onClick={() => navigate('/seller/store')}>
              <Store className="mr-2 h-4 w-4" />
              <span>Toko Saya</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/seller/products')}>
              <Package className="mr-2 h-4 w-4" />
              <span>Produk Saya</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuItem onClick={() => navigate('/account')}>
          <UserCircle className="mr-2 h-4 w-4" />
          <span>Akun Saya</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Pengaturan</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
