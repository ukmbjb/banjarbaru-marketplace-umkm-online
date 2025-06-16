import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Edit, Save, X, Package, MapPin, CreditCard, ShoppingBag, Heart, Bell, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

const Account = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
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
        address: profileData.address,
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
      address: profile?.address || '',
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

  // Mock data for orders (since there's no orders table yet)
  const mockOrders = [
    {
      id: '1',
      date: '2023-06-15',
      status: 'completed',
      total: 250000,
      items: [
        { name: 'Produk UMKM 1', quantity: 2, price: 125000 }
      ]
    },
    {
      id: '2',
      date: '2023-06-10',
      status: 'processing',
      total: 75000,
      items: [
        { name: 'Produk UMKM 2', quantity: 1, price: 75000 }
      ]
    },
  ];

  // Mock data for addresses (since there's no addresses table yet)
  const mockAddresses = [
    {
      id: '1',
      name: 'Rumah',
      recipient: profile?.full_name || user?.user_metadata?.full_name,
      phone: profile?.phone,
      address: 'Jl. Contoh No. 123',
      city: 'Banjarbaru',
      province: 'Kalimantan Selatan',
      postalCode: '70714',
      isDefault: true
    }
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <User className="w-8 h-8 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Akun Saya</h1>
              <p className="text-gray-600">Kelola informasi dan pengaturan akun Anda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with user info */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <User className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="font-medium text-lg">
                      {profile?.full_name || user?.user_metadata?.full_name || user?.email}
                    </h3>
                    <Badge variant={getRoleColor() as any} className="mt-2">
                      {getRoleLabel()}
                    </Badge>
                    <div className="mt-6 w-full">
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="outline" 
                          className="justify-start" 
                          onClick={() => setActiveTab('profile')}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profil Saya
                        </Button>
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => setActiveTab('orders')}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Pesanan Saya
                        </Button>
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => setActiveTab('addresses')}
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Alamat Saya
                        </Button>
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => setActiveTab('wishlist')}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Wishlist
                        </Button>
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => setActiveTab('notifications')}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Notifikasi
                        </Button>
                        <Button 
                          variant="outline" 
                          className="justify-start"
                          onClick={() => setActiveTab('settings')}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Pengaturan
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Role-specific links */}
              {role === 'seller' && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-base">Akses Penjual</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/seller/store'}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Kelola Toko
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => window.location.href = '/seller/products'}
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Kelola Produk
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {role === 'admin' && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-base">Akses Admin</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.location.href = '/admin'}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Panel Admin
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main content area */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    {activeTab === 'profile' && (
                      <>
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
                      </>
                    )}
                    {activeTab === 'orders' && (
                      <div>
                        <CardTitle>Pesanan Saya</CardTitle>
                        <CardDescription>
                          Riwayat dan status pesanan Anda
                        </CardDescription>
                      </div>
                    )}
                    {activeTab === 'addresses' && (
                      <div>
                        <CardTitle>Alamat Saya</CardTitle>
                        <CardDescription>
                          Kelola alamat pengiriman Anda
                        </CardDescription>
                      </div>
                    )}
                    {activeTab === 'wishlist' && (
                      <div>
                        <CardTitle>Wishlist</CardTitle>
                        <CardDescription>
                          Produk yang Anda simpan
                        </CardDescription>
                      </div>
                    )}
                    {activeTab === 'notifications' && (
                      <div>
                        <CardTitle>Notifikasi</CardTitle>
                        <CardDescription>
                          Pemberitahuan dan informasi terbaru
                        </CardDescription>
                      </div>
                    )}
                    {activeTab === 'settings' && (
                      <div>
                        <CardTitle>Pengaturan</CardTitle>
                        <CardDescription>
                          Kelola pengaturan akun Anda
                        </CardDescription>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div>
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

                          <div>
                            <label className="block text-sm font-medium mb-2">Alamat</label>
                            <Textarea
                              value={profileData.address}
                              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                              placeholder="Masukkan alamat lengkap"
                              rows={3}
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
                            <h3 className="font-medium text-gray-700">Alamat</h3>
                            <p className="text-gray-600">
                              {profile?.address || 'Belum diisi'}
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
                    </div>
                  )}

                  {/* Orders Tab */}
                  {activeTab === 'orders' && (
                    <div className="space-y-4">
                      {mockOrders.length > 0 ? (
                        mockOrders.map(order => (
                          <Card key={order.id} className="overflow-hidden">
                            <div className="bg-muted px-4 py-2 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Pesanan #{order.id}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(order.date).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                              <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                {order.status === 'completed' ? 'Selesai' : 'Diproses'}
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between py-2">
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
                                  </div>
                                  <p className="font-medium">
                                    Rp {item.price.toLocaleString('id-ID')}
                                  </p>
                                </div>
                              ))}
                              <div className="border-t mt-2 pt-2 flex justify-between items-center">
                                <span className="font-medium">Total</span>
                                <span className="font-bold text-lg">
                                  Rp {order.total.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </CardContent>
                            <div className="bg-muted px-4 py-2 flex justify-end">
                              <Button variant="outline" size="sm">
                                Lihat Detail
                              </Button>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                          <h3 className="text-lg font-medium">Belum ada pesanan</h3>
                          <p className="text-gray-500 mt-1">Pesanan Anda akan muncul di sini</p>
                          <Button className="mt-4" onClick={() => window.location.href = '/'}>
                            Mulai Belanja
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Addresses Tab */}
                  {activeTab === 'addresses' && (
                    <div className="space-y-4">
                      {mockAddresses.map(address => (
                        <Card key={address.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{address.name}</h3>
                                  {address.isDefault && (
                                    <Badge variant="outline" className="text-xs">Utama</Badge>
                                  )}
                                </div>
                                <p className="text-sm mt-1">{address.recipient}</p>
                                <p className="text-sm text-gray-500">{address.phone}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                  {address.address}, {address.city}, {address.province}, {address.postalCode}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        Tambah Alamat Baru
                      </Button>
                    </div>
                  )}

                  {/* Wishlist Tab */}
                  {activeTab === 'wishlist' && (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium">Wishlist Kosong</h3>
                      <p className="text-gray-500 mt-1">Produk yang Anda simpan akan muncul di sini</p>
                      <Button className="mt-4" onClick={() => window.location.href = '/'}>
                        Jelajahi Produk
                      </Button>
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium">Tidak Ada Notifikasi</h3>
                      <p className="text-gray-500 mt-1">Notifikasi Anda akan muncul di sini</p>
                    </div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === 'settings' && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Notifikasi Email</h3>
                        <div className="flex items-center justify-between">
                          <span>Terima notifikasi pesanan</span>
                          <Button variant="outline" size="sm">
                            Aktif
                          </Button>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h3 className="font-medium mb-2">Keamanan Akun</h3>
                        <Button variant="outline" className="w-full justify-start">
                          Ubah Kata Sandi
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Account;