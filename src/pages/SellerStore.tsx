
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Store, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

const SellerStore = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
  });

  const { data: store, refetch } = useQuery({
    queryKey: ['my-store', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const createStore = async () => {
    if (!user?.id) return;

    const { error } = await supabase
      .from('stores')
      .insert({
        owner_id: user.id,
        name: editData.name,
        description: editData.description,
        address: editData.address,
        phone: editData.phone,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal membuat toko",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Toko berhasil dibuat dan akan diverifikasi admin",
      });
      setIsEditing(false);
      refetch();
    }
  };

  const updateStore = async () => {
    if (!store?.id) return;

    const { error } = await supabase
      .from('stores')
      .update({
        name: editData.name,
        description: editData.description,
        address: editData.address,
        phone: editData.phone,
      })
      .eq('id', store.id);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate toko",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Toko berhasil diupdate",
      });
      setIsEditing(false);
      refetch();
    }
  };

  const startEditing = () => {
    if (store) {
      setEditData({
        name: store.name || '',
        description: store.description || '',
        address: store.address || '',
        phone: store.phone || '',
      });
    }
    setIsEditing(true);
  };

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Store className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Toko Saya</h1>
              <p className="text-gray-600">Kelola informasi toko Anda</p>
            </div>
          </div>

          {!store && !isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Belum Ada Toko</CardTitle>
                <CardDescription>
                  Anda belum memiliki toko. Buat toko sekarang untuk mulai berjualan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Store className="w-4 h-4 mr-2" />
                  Buat Toko
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{isEditing ? (store ? 'Edit Toko' : 'Buat Toko Baru') : store?.name}</CardTitle>
                    <CardDescription>
                      {isEditing ? 'Lengkapi informasi toko Anda' : 'Informasi toko Anda'}
                    </CardDescription>
                  </div>
                  {store && !isEditing && (
                    <div className="flex items-center gap-2">
                      <Badge variant={store.is_verified ? "default" : "secondary"}>
                        {store.is_verified ? "Terverifikasi" : "Menunggu Verifikasi"}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={startEditing}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Toko</label>
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        placeholder="Masukkan nama toko"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Deskripsi</label>
                      <Textarea
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        placeholder="Deskripsikan toko Anda"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Alamat</label>
                      <Textarea
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        placeholder="Alamat lengkap toko"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Nomor Telepon</label>
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="Nomor telepon yang bisa dihubungi"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={store ? updateStore : createStore}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        {store ? 'Update' : 'Buat Toko'}
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
                      <h3 className="font-medium text-gray-700">Deskripsi</h3>
                      <p className="text-gray-600">{store?.description || 'Belum ada deskripsi'}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Alamat</h3>
                      <p className="text-gray-600">{store?.address || 'Belum ada alamat'}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Nomor Telepon</h3>
                      <p className="text-gray-600">{store?.phone || 'Belum ada nomor telepon'}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-700">Status</h3>
                      <p className="text-gray-600">
                        {store?.is_verified 
                          ? 'Toko Anda sudah terverifikasi dan dapat menerima pesanan'
                          : 'Toko Anda sedang dalam proses verifikasi oleh admin'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerStore;
