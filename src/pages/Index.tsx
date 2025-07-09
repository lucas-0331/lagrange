
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MatrixInput } from '@/components/MatrixInput';
import { LagrangeCalculator } from '@/components/LagrangeCalculator';
import { Calculator, TrendingUp, Zap } from 'lucide-react';

const Index = () => {
  const [points, setPoints] = useState([
    { x: 1.3, y: 3.669 },
    { x: 1.4, y: 4.055 },
    { x: 1.5, y: 4.482 }
  ]);
  const [xEval, setXEval] = useState(1.32);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (points.length >= 2 && xEval !== null) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Interpolação de Lagrange</h1>
          </div>
          <p className="text-xl text-blue-100">
            Matemática Computacional - Ciência da Computação 7° período
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Pontos da Matriz
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <MatrixInput points={points} setPoints={setPoints} />
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Ponto para Interpolar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor de x para avaliar:
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={xEval}
                  onChange={(e) => setXEval(parseFloat(e.target.value))}
                  className="text-lg"
                  placeholder="Ex: 1.25"
                />
              </div>
              <Button 
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                disabled={points.length < 2 || isNaN(xEval)}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Interpolação
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        {showResults && (
          <LagrangeCalculator 
            points={points} 
            xEval={xEval} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
