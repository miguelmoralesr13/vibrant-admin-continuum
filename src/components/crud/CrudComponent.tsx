
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface CrudComponentProps<T> {
  items: T[];
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  title: string;
}

export function CrudComponent<T>({
  items,
  onAdd,
  onEdit,
  onDelete,
  renderItem,
  title,
}: CrudComponentProps<T>) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <Card>
      <Card.Header className="flex flex-row items-center justify-between">
        <Card.Title>{title}</Card.Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-secondary' : ''}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-secondary' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          {onAdd && (
            <Button onClick={onAdd} size="sm">
              Add New
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Content>
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-2'
          }
        >
          {items.map((item, index) => (
            <div key={index} className="relative group">
              {renderItem(item)}
              {(onEdit || onDelete) && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  {onEdit && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
