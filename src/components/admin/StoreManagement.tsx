
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  description: string;
  is_verified: boolean;
  profiles: {
    full_name: string;
    email: string;
  } | null;
}

interface StoreManagementProps {
  stores: Store[];
  onVerifyStore: (storeId: string, verified: boolean) => void;
}

const StoreManagement = ({ stores, onVerifyStore }: StoreManagementProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Kelola Toko</CardTitle>
        <CardDescription>
          Verifikasi dan kelola toko yang terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stores?.map((store) => (
            <div key={store.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{store.name}</h3>
                  <Badge variant={store.is_verified ? "default" : "secondary"}>
                    {store.is_verified ? "Terverifikasi" : "Menunggu"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{store.description}</p>
                <p className="text-xs text-gray-500">
                  Pemilik: {store.profiles?.full_name || 'N/A'} ({store.profiles?.email || 'N/A'})
                </p>
              </div>
              <div className="flex gap-2">
                {!store.is_verified && (
                  <Button
                    size="sm"
                    onClick={() => onVerifyStore(store.id, true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verifikasi
                  </Button>
                )}
                {store.is_verified && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onVerifyStore(store.id, false)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Batalkan
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreManagement;
