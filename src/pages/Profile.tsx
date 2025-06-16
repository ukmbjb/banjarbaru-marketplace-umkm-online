
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

const Profile = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const updateProfile = async () => {
    if (!user?.id) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profileData.full_name,
        email: profileData.email,
        phone: profileData.phone,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate profil",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Profil berhasil diupdate",
      });
      setIsEditing(false);
      refetch();
    }
  };

  const startEditing = () => {
    setProfileData({
      full_name: profile?.full_name || user?.user_metadata?.full_name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || '',
    });
    setIsEditing(true);
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
        return 'destructive';
      case 'seller':
        return 'default';
      case 'customer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
              <p className="text-gray-600">Kelola informasi akun Anda</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Informasi Profil</CardTitle>
                    <CardDescription>
                      Data pribadi dan informasi kontak Anda
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={startEditing}>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                      <Input
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="Masukkan email"
                        type="email"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={updateProfile}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Simpan
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="w-4 h-4 mr-1" />
                        Batal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Nama Lengkap</h3>
                      <p className="text-gray-600">
                        {profile?.full_name || user?.user_metadata?.full_name || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Email</h3>
                      <p className="text-gray-600">
                        {profile?.email || user?.email || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Nomor Telepon</h3>
                      <p className="text-gray-600">
                        {profile?.phone || 'Belum diisi'}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Peran</h3>
                      <Badge variant={getRoleColor() as any}>
                        {getRoleLabel()}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Bergabung Sejak</h3>
                      <p className="text-gray-600">
                        {profile?.created_at 
                          ? new Date(profile.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Tidak diketahui'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Role-specific information */}
            {role === 'seller' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Akses Penjual</CardTitle>
                  <CardDescription>
                    Fitur khusus untuk penjual UMKM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = '/seller/store'}
                    >
                      Kelola Toko
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = '/seller/products'}
                    >
                      Kelola Produk
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {role === 'admin' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Akses Administrator</CardTitle>
                  <CardDescription>
                    Fitur khusus untuk admin sistem
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/admin'}
                  >
                    Panel Administrator
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
