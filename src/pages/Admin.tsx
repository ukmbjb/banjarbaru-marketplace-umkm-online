
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminStatsCards from '@/components/admin/AdminStatsCards';
import StoreManagement from '@/components/admin/StoreManagement';
import UserManagement from '@/components/admin/UserManagement';

const Admin = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: stores, refetch: refetchStores } = useQuery({
    queryKey: ['admin-stores'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Fetch profile data separately for each store
      const storesWithProfiles = await Promise.all(
        data.map(async (store) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', store.owner_id)
            .single();
          
          return {
            ...store,
            profiles: profile || { full_name: 'N/A', email: 'N/A' }
          };
        })
      );
      
      return storesWithProfiles;
    },
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Fetch user roles separately for each user
      const usersWithRoles = await Promise.all(
        data.map(async (user) => {
          const { data: roles } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id);
          
          return {
            ...user,
            user_roles: roles || []
          };
        })
      );
      
      return usersWithRoles;
    },
  });

  const verifyStore = async (storeId: string, verified: boolean) => {
    const { error } = await supabase
      .from('stores')
      .update({ is_verified: verified })
      .eq('id', storeId);

    if (error) {
      toast({
        title: "Error",
        description: "Gagal mengupdate status toko",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Berhasil",
        description: `Toko berhasil ${verified ? 'diverifikasi' : 'ditolak'}`,
      });
      refetchStores();
    }
  };

  const usersCount = users?.length || 0;
  const storesCount = stores?.length || 0;
  const verifiedStoresCount = stores?.filter(store => store.is_verified).length || 0;
  const pendingStoresCount = stores?.filter(store => !store.is_verified).length || 0;

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminLayout>
        <AdminStatsCards
          usersCount={usersCount}
          storesCount={storesCount}
          verifiedStoresCount={verifiedStoresCount}
          pendingStoresCount={pendingStoresCount}
        />
        
        <StoreManagement
          stores={stores || []}
          onVerifyStore={verifyStore}
        />
        
        <UserManagement users={users || []} />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default Admin;
