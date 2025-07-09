
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResultsTable } from '@/components/ResultsTable';
import { InterpolationChart } from '@/components/InterpolationChart';
import { StepByStep } from '@/components/StepByStep';
import { BarChart3, LineChart, BookOpen } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface LagrangeCalculatorProps {
  points: Point[]; // x: abscissas, y: ordenadas
  xEval: number; // z: valor a ser interpolado
}

interface LagrangeResult {
  i: number;
  xi: number; // x[i]
  yi: number; // y[i]
  li: number; // li (produto dos termos)
  weighted: number; // p (termo final multiplicado por y[i])
}

export const LagrangeCalculator: React.FC<LagrangeCalculatorProps> = ({ points, xEval }) => {
  const calculateLagrange = () => {
    const n = points.length;
    let totalSum = 0;
    const results: LagrangeResult[] = [];

    for (let i = 0; i < n; i++) {
      const { x: xi, y: yi } = points[i];
      
      // Calcula Li(x_eval)
      let li = 1.0;
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          li *= (xEval - points[j].x) / (xi - points[j].x);
        }
      }
      
      const weighted = yi * li;
      totalSum += weighted;
      
      results.push({
        i,
        xi,
        yi,
        li,
        weighted
      });
    }

    return { results, totalSum };
  };

  const { results, totalSum } = calculateLagrange();

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Resultado da Interpolação</h3>
          <p className="text-lg opacity-90 mb-4">
            Para x = {xEval}, o valor interpolado é:
          </p>
          <div className="text-4xl font-bold bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            P({xEval}) = {totalSum.toFixed(5)}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Tabela de Cálculos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ResultsTable results={results} totalSum={totalSum} xEval={xEval} />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Visualização Gráfica
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <InterpolationChart 
              points={points} 
              xEval={xEval} 
              yEval={totalSum} 
            />
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Explicação Passo a Passo
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <StepByStep points={points} xEval={xEval} results={results} />
        </CardContent>
      </Card>
    </div>
  );
};
