```tsx
import React from 'react';
import { useSupabase } from '../../contexts/SupabaseContext';
import { Wifi, WifiOff } from 'lucide-react';

export function ConnectionStatus() {
  const supabase = useSupabase();
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('profiles').select('id').limit(1);
        setIsConnected(!error);
      } catch {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [supabase]);

  if (!isConnected) {
    return (
      <div className="fixed bottom-4 right-4">
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow flex items-center space-x-2">
          <WifiOff className="h-5 w-5" />
          <span>Disconnected</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4">
      <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg shadow flex items-center space-x-2">
        <Wifi className="h-5 w-5" />
        <span>Connected</span>
      </div>
    </div>
  );
}
```