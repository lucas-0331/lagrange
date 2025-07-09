
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface MatrixInputProps {
  points: Point[];
  setPoints: (points: Point[]) => void;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({ points, setPoints }) => {
  const addPoint = () => {
    const lastX = points.length > 0 ? points[points.length - 1].x : 1.0;
    const newX = Math.round((lastX + 0.1) * 10) / 10;
    const newY = Math.round(Math.exp(newX) * 1000) / 1000;
    setPoints([...points, { x: newX, y: newY }]);
  };

  const removePoint = (index: number) => {
    if (points.length > 2) {
      setPoints(points.filter((_, i) => i !== index));
    }
  };

  const updatePoint = (index: number, field: 'x' | 'y', value: string) => {
    const newPoints = [...points];
    // Se o valor está vazio, permite que fique vazio temporariamente
    if (value === '' || value === '-' || value === '.') {
      newPoints[index][field] = value === '' ? 0 : parseFloat(value) || 0;
    } else {
      const numValue = parseFloat(value);
      newPoints[index][field] = isNaN(numValue) ? 0 : numValue;
    }
    setPoints(newPoints);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-gray-600 border-b pb-2">
        <div className="text-center">x</div>
        <div className="text-center">f(x)</div>
        <div className="text-center">Ação</div>
      </div>

      {/* Pontos */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {points.map((point, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center p-2 bg-gray-50 rounded-lg">
            <Input
              type="number"
              step="0.1"
              value={point.x}
              onChange={(e) => updatePoint(index, 'x', e.target.value)}
              className="text-center font-mono"
              placeholder="0"
            />
            <Input
              type="number"
              step="0.001"
              value={point.y}
              onChange={(e) => updatePoint(index, 'y', e.target.value)}
              className="text-center font-mono"
              placeholder="0"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removePoint(index)}
              disabled={points.length <= 2}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        onClick={addPoint}
        variant="outline"
        className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Ponto
      </Button>
    </div>
  );
};
