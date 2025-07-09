
import React from 'react';

interface Point {
  x: number;
  y: number;
}

interface LagrangeResult {
  i: number;
  xi: number;
  yi: number;
  li: number;
  weighted: number;
}

interface StepByStepProps {
  points: Point[];
  xEval: number;
  results: LagrangeResult[];
}

export const StepByStep: React.FC<StepByStepProps> = ({ points, xEval, results }) => {
  const renderPolynomialBasis = (i: number) => {
    const terms = [];
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        terms.push(`(${xEval} - ${points[j].x}) / (${points[i].x} - ${points[j].x})`);
      }
    }
    return terms.join(' × ');
  };

  return (
    <div className="space-y-6">
      {/* Introdução */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h4 className="font-semibold text-blue-900 mb-2">🔍 Método de Interpolação de Lagrange</h4>
        <p className="text-blue-800 text-sm">
          A interpolação de Lagrange constrói um polinômio que passa exatamente pelos pontos dados.
          A fórmula é: <span className="font-mono bg-white px-2 py-1 rounded">P(x) = Σ yᵢ × Lᵢ(x)</span>
        </p>
      </div>

      {/* Cálculo dos polinômios base */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">📐 Cálculo dos Polinômios Base Lᵢ(x)</h4>
        
        {results.map((result, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="font-semibold text-gray-700">
              Passo {index + 1}: L<sub>{result.i}</sub>({xEval}) para o ponto ({result.xi}, {result.yi})
            </div>
            
            <div className="font-mono text-sm bg-white p-3 rounded border">
              <div className="text-purple-600">
                L<sub>{result.i}</sub>({xEval}) = {renderPolynomialBasis(result.i)}
              </div>
              <div className="text-blue-600 mt-2">
                L<sub>{result.i}</sub>({xEval}) = {result.li.toFixed(4)}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <strong>Termo ponderado:</strong> y<sub>{result.i}</sub> × L<sub>{result.i}</sub>({xEval}) = {result.yi} × {result.li.toFixed(4)} = <strong className="text-green-600">{result.weighted.toFixed(5)}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Resultado final */}
      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
        <h4 className="font-semibold text-green-900 mb-2">🎯 Resultado Final</h4>
        <div className="space-y-2">
          <div className="font-mono text-sm">
            P({xEval}) = {results.map((r, i) => `${r.weighted.toFixed(5)}`).join(' + ')}
          </div>
          <div className="font-mono text-lg font-bold text-green-700">
            P({xEval}) = {results.reduce((sum, r) => sum + r.weighted, 0).toFixed(5)}
          </div>
        </div>
        <p className="text-green-800 text-sm mt-2">
          Portanto, o valor interpolado de f({xEval}) é aproximadamente <strong>{results.reduce((sum, r) => sum + r.weighted, 0).toFixed(5)}</strong>
        </p>
      </div>

      {/* Propriedades importantes */}
      {/*<div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 Propriedades Importantes</h4>
        <ul className="text-yellow-800 text-sm space-y-1">
          <li>• O polinômio de Lagrange é único para um conjunto de pontos</li>
          <li>• Grau do polinômio = número de pontos - 1 (grau {points.length - 1} neste caso)</li>
          <li>• Passa exatamente por todos os pontos dados</li>
          <li>• Útil para interpolação, mas pode oscilar entre os pontos</li>
        </ul>
      </div>*/}
    </div>
  );
};
