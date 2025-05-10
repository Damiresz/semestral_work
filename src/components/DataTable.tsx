import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  online: boolean;
}

export default function DataTable() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsOnline(typeof window !== 'undefined' ? window.navigator.onLine : true);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) return;
    setLoading(true);
    setError(null);
    fetch('/api/tabledata')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(setData)
      .catch(() => setError('No connection. User list unavailable.'))
      .finally(() => setLoading(false));
  }, [isOnline]);

  if (!isOnline) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Users (semantic table)</h2>
        <div className="p-6 bg-yellow-100 text-yellow-800 rounded-lg text-center font-medium">
          No connection. User list unavailable.
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Users (semantic table)</h2>
        <div className="p-6 bg-yellow-100 text-yellow-800 rounded-lg text-center font-medium">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Users (semantic table)</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-4">No data</td></tr>
            ) : (
              data.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border-b text-center">{user.id}</td>
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">{user.role}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <span className={user.online ? 'inline-flex items-center gap-1 text-green-600' : 'inline-flex items-center gap-1 text-gray-400'}>
                      <span className={user.online ? 'w-2 h-2 rounded-full bg-green-500 inline-block' : 'w-2 h-2 rounded-full bg-gray-400 inline-block'}></span>
                      {user.online ? 'Online' : 'Offline'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
} 