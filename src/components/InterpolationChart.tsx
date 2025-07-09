
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart, ReferenceLine } from 'recharts';

interface Point {
  x: number;
  y: number;
}

interface InterpolationChartProps {
  points: Point[];
  xEval: number;
  yEval: number;
}

export const InterpolationChart: React.FC<InterpolationChartProps> = ({ points, xEval, yEval }) => {
  // Gerar pontos para a curva suave do polinômio
  const generatePolynomialCurve = () => {
    const minX = Math.min(...points.map(p => p.x), xEval) - 0.2;
    const maxX = Math.max(...points.map(p => p.x), xEval) + 0.2;
    const step = (maxX - minX) / 100;
    
    const curvePoints = [];
    for (let x = minX; x <= maxX; x += step) {
      let y = 0;
      
      // Calcular interpolação de Lagrange para cada ponto da curva
      for (let i = 0; i < points.length; i++) {
        let li = 1;
        for (let j = 0; j < points.length; j++) {
          if (i !== j) {
            li *= (x - points[j].x) / (points[i].x - points[j].x);
          }
        }
        y += points[i].y * li;
      }
      
      curvePoints.push({ x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(3)) });
    }
    
    return curvePoints;
  };

  const curveData = generatePolynomialCurve();
  
  // Dados para os pontos originais
  const originalPoints = points.map(p => ({ x: p.x, y: p.y, type: 'original' }));
  
  // Ponto interpolado
  const interpolatedPoint = [{ x: xEval, y: yEval, type: 'interpolated' }];

  return (
    <div className="space-y-4">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="x" 
              type="number" 
              scale="linear" 
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
              stroke="#6b7280"
            />
            <YAxis 
              type="number" 
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              stroke="#6b7280"
            />
            <Tooltip 
              formatter={(value: any, name: string) => [
                typeof value === 'number' ? value.toFixed(4) : value, 
                name === 'y' ? 'f(x)' : name
              ]}
              labelFormatter={(value: any) => `x = ${typeof value === 'number' ? value.toFixed(3) : value}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            {/* Curva do polinômio */}
            <Line 
              dataKey="y" 
              data={curveData}
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={false}
              name="Polinômio de Lagrange"
            />
            
            {/* Pontos originais */}
            {originalPoints.map((point, index) => (
              <ReferenceLine 
                key={`original-${index}`}
                x={point.x} 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="0"
              />
            ))}
            
            {/* Linha vertical para ponto interpolado */}
            <ReferenceLine 
              x={xEval} 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Pontos Dados</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-purple-500"></div>
          <span>Polinômio de Lagrange</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Ponto Interpolado</span>
        </div>
      </div>
    </div>
  );
};
