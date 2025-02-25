
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDevToolsStore } from '@/lib/store';
import { useState } from 'react';

export function DevTools() {
  const { isMockingEnabled, apiDelay, setMockingEnabled, setApiDelay } = useDevToolsStore();
  const [isOpen, setIsOpen] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        DevTools
      </Button>

      {isOpen && (
        <Card className="absolute bottom-12 right-0 w-80 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>API Mocking</span>
              <Button
                variant={isMockingEnabled ? "default" : "secondary"}
                size="sm"
                onClick={() => setMockingEnabled(!isMockingEnabled)}
              >
                {isMockingEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm">API Delay (ms)</label>
              <Input
                type="number"
                value={apiDelay}
                onChange={(e) => setApiDelay(Number(e.target.value))}
                min={0}
                max={5000}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
