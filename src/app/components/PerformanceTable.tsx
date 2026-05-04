export function PerformanceTable({ title, data }: { title: string; data: any[] }) {
  const calculateProgress = (achieved: number, target: number) => {
    return Math.min((achieved / target) * 100, 100);
  };

  const calculateVsLY = (current: number, ly: number) => {
    if (!ly) return 0;
    return ((current - ly) / ly) * 100;
  };

  const totalRow = data.find(row => row.isTotal);
  const regularRows = data.filter(row => !row.isTotal);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#007BC9' }}>
        <h3 className="text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm text-gray-700">Product</th>
              <th className="px-6 py-3 text-right text-sm text-gray-700">Target</th>
              <th className="px-6 py-3 text-right text-sm text-gray-700">Achieved</th>
              <th className="px-6 py-3 text-right text-sm text-gray-700">LY</th>
              <th className="px-6 py-3 text-right text-sm text-gray-700">Growth</th>
            </tr>
          </thead>
          <tbody>
            {regularRows.map((row, index) => {
              const progress = calculateProgress(row.achieved, row.target);
              const vsLY = calculateVsLY(row.achieved, row.ly);

              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors" style={{ height: '64px' }}>
                  <td className="px-6 py-4 text-gray-900">{row.product}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{row.target.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: progress >= 90 ? '#10b981' : progress >= 70 ? '#FFE000' : '#ef4444',
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-gray-900 text-right" style={{ minWidth: '60px' }}>
                        {row.achieved.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">{row.ly.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className={`font-medium ${vsLY >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {vsLY >= 0 ? '+' : ''}{vsLY.toFixed(1)}%
                    </div>
                  </td>
                </tr>
              );
            })}
            {totalRow && (
              <tr className="bg-gray-50 border-t-2 border-gray-300" style={{ height: '64px' }}>
                <td className="px-6 py-4 font-bold text-gray-900">{totalRow.product}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">{totalRow.target.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1"></div>
                    <div className="text-gray-900 text-right font-bold" style={{ minWidth: '60px' }}>
                      {totalRow.achieved.toLocaleString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">{totalRow.ly.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <div className={`font-bold ${calculateVsLY(totalRow.achieved, totalRow.ly) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateVsLY(totalRow.achieved, totalRow.ly) >= 0 ? '+' : ''}{calculateVsLY(totalRow.achieved, totalRow.ly).toFixed(1)}%
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
