
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserRole {
  role: string;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  user_roles: UserRole[];
}

interface UserManagementProps {
  users: User[];
}

const UserManagement = ({ users }: UserManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kelola Pengguna</CardTitle>
        <CardDescription>
          Daftar semua pengguna yang terdaftar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users?.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{user.full_name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <Badge variant="outline">
                  {Array.isArray(user.user_roles) && user.user_roles.length > 0 
                    ? user.user_roles[0].role 
                    : 'customer'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
