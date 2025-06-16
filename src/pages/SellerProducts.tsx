
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

const SellerProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: '',
  });

  const { data: store } = useQuery({
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

  const { data: products, refetch } = useQuery({
    queryKey: ['my-products', store?.id],
    queryFn: async () => {
      if (!store?.id) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', store.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!store?.id,
  });

  const resetForm = () => {
    setProductData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image_url: '',
    });
  };

  const createProduct = async () => {
    if (!store?.id) return;

    const { error } = await supabase
      .from('products')
      .insert({
        store_id: store.id,
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock) || 0,
        image_url: productData.image_url,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menambah produk",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Produk berhasil ditambahkan",
      });
      setIsCreating(false);
      resetForm();
      refetch();
    }
  };

  const updateProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock) || 0,
        image_url: productData.image_url,
      })
      .eq('id', productId);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate produk",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Produk berhasil diupdate",
      });
      setEditingId(null);
      resetForm();
      refetch();
    }
  };

  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus produk",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: "Produk berhasil dihapus",
      });
      refetch();
    }
  };

  const startEditing = (product: any) => {
    setProductData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category || '',
      stock: product.stock?.toString() || '0',
      image_url: product.image_url || '',
    });
    setEditingId(product.id);
  };

  if (!store) {
    return (
      <ProtectedRoute allowedRoles={['seller']}>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Toko Diperlukan</CardTitle>
              <CardDescription>
                Anda perlu membuat toko terlebih dahulu sebelum dapat mengelola produk.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => window.location.href = '/seller/store'}>
                Buat Toko
              </Button>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Produk Saya</h1>
                <p className="text-gray-600">Kelola produk untuk toko {store.name}</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsCreating(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>

          {!store.is_verified && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="pt-6">
                <p className="text-yellow-800">
                  Toko Anda belum terverifikasi. Produk tidak akan tampil di katalog publik hingga toko diverifikasi oleh admin.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Add/Edit Product Form */}
          {(isCreating || editingId) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{isCreating ? 'Tambah Produk Baru' : 'Edit Produk'}</CardTitle>
                <CardDescription>
                  Lengkapi informasi produk yang akan dijual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama Produk</label>
                    <Input
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                      placeholder="Nama produk"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <Input
                      value={productData.category}
                      onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                      placeholder="Kategori produk"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Harga (Rp)</label>
                    <Input
                      type="number"
                      value={productData.price}
                      onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Stok</label>
                    <Input
                      type="number"
                      value={productData.stock}
                      onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">URL Gambar</label>
                    <Input
                      value={productData.image_url}
                      onChange={(e) => setProductData({ ...productData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Deskripsi</label>
                    <Textarea
                      value={productData.description}
                      onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                      placeholder="Deskripsi produk"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={isCreating ? createProduct : () => updateProduct(editingId!)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {isCreating ? 'Tambah' : 'Update'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setEditingId(null);
                      resetForm();
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  {product.image_url && (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant={product.is_active ? "default" : "secondary"}>
                        {product.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Rp {product.price?.toLocaleString()}</span>
                      <span>Stok: {product.stock}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => startEditing(product)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Hapus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {products?.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">Belum Ada Produk</h3>
                <p className="text-gray-500 mb-4">Mulai tambahkan produk untuk dijual di toko Anda</p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Produk Pertama
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerProducts;
