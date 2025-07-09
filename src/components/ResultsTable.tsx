
import React from 'react';

interface LagrangeResult {
  i: number;
  xi: number;
  yi: number;
  li: number;
  weighted: number;
}

interface ResultsTableProps {
  results: LagrangeResult[];
  totalSum: number;
  xEval: number;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, totalSum, xEval }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-4 py-3 text-center font-semibold text-gray-700">i</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">x<sub>i</sub></th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">y<sub>i</sub></th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">L<sub>i</sub>({xEval})</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">y<sub>i</sub> × L<sub>i</sub>({xEval})</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr 
              key={index} 
              className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <td className="px-4 py-3 text-center font-mono font-medium">{result.i}</td>
              <td className="px-4 py-3 text-center font-mono">{result.xi.toFixed(2)}</td>
              <td className="px-4 py-3 text-center font-mono">{result.yi.toFixed(3)}</td>
              <td className="px-4 py-3 text-center font-mono text-blue-600 font-medium">
                {result.li >= 0 ? '+' : ''}{result.li.toFixed(4)}
              </td>
              <td className="px-4 py-3 text-center font-mono text-purple-600 font-medium">
                {result.weighted >= 0 ? '+' : ''}{result.weighted.toFixed(5)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gradient-to-r from-blue-100 to-purple-100 border-t-2 border-blue-300">
            <td colSpan={4} className="px-4 py-4 text-right font-bold text-gray-700">
              SOMA DOS TERMOS PONDERADOS =
            </td>
            <td className="px-4 py-4 text-center font-mono font-bold text-green-600 text-lg">
              {totalSum.toFixed(5)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
