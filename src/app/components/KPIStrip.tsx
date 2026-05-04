import { TrendingUp, Target, Award, TrendingDown } from 'lucide-react';

export function KPIStrip({ data }: { data: any }) {
  const momGrowthValue = parseFloat(data.momGrowth);
  const isPositiveGrowth = momGrowthValue >= 0;

  const kpis = [
    {
      label: 'Rank',
      value: `#${data.rank}`,
      icon: Award,
      highlight: true,
    },
    {
      label: 'Target Achievement',
      value: `${data.targetAchievement}%`,
      icon: Target,
      highlight: false,
    },
    {
      label: 'YoY Growth',
      value: `${data.yoyGrowth}%`,
      icon: TrendingUp,
      highlight: false,
    },
    {
      label: 'MoM Growth',
      value: `${data.momGrowth}%`,
      icon: isPositiveGrowth ? TrendingUp : TrendingDown,
      highlight: false,
      isGrowth: true,
      growthPositive: isPositiveGrowth,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const isGrowthCard = kpi.isGrowth;
        const growthColor = isGrowthCard ? (kpi.growthPositive ? '#10b981' : '#ef4444') : kpi.highlight ? '#FFE000' : '#007BC9';

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-shadow hover:shadow-md"
            style={kpi.highlight ? { borderLeft: '4px solid #FFE000' } : {}}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: growthColor }}
              >
                <Icon size={20} className={kpi.highlight ? 'text-gray-900' : 'text-white'} />
              </div>
              {isGrowthCard && (
                <div className={`flex items-center gap-1 ${kpi.growthPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.growthPositive ? '↑' : '↓'}
                </div>
              )}
            </div>
            <div className="text-3xl text-gray-900 mb-1">{kpi.value}</div>
            <div className="text-sm text-gray-600">{kpi.label}</div>
          </div>
        );
      })}
    </div>
  );
}
