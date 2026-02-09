interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  height?: number;
}

export function EnhancedBarChart({ data, title, height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg mb-6 text-gray-800">{title}</h3>
      <div className="space-y-4" style={{ minHeight: `${height}px` }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color || '#3b82f6',
                  }}
                >
                  <span className="text-xs font-semibold text-white">
                    {percentage > 10 ? `${Math.round(percentage)}%` : ''}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  title: string;
  height?: number;
  color?: string;
}

export function EnhancedLineChart({ data, title, height = 300, color = '#3b82f6' }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const minValue = Math.min(...data.map((d) => d.value), 0);
  const range = maxValue - minValue || 1;
  const svgHeight = height;
  const svgWidth = 600;

  // Generate gradient ID
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg mb-6 text-gray-800">{title}</h3>
      <div className="relative" style={{ height: `${svgHeight}px` }}>
        <svg className="w-full h-full" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = (svgHeight / 4) * i;
            return (
              <line
                key={i}
                x1="0"
                y1={y}
                x2={svgWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            );
          })}

          {/* Area under line */}
          <path
            d={`M 0,${svgHeight} ${data
              .map((item, index) => {
                const x = (index / (data.length - 1 || 1)) * svgWidth;
                const y = svgHeight - ((item.value - minValue) / range) * (svgHeight - 40) - 20;
                return `L ${x},${y}`;
              })
              .join(' ')} L ${svgWidth},${svgHeight} Z`}
            fill={`url(#${gradientId})`}
          />

          {/* Line */}
          <polyline
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1 || 1)) * svgWidth;
                const y = svgHeight - ((item.value - minValue) / range) * (svgHeight - 40) - 20;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1 || 1)) * svgWidth;
            const y = svgHeight - ((item.value - minValue) / range) * (svgHeight - 40) - 20;
            return (
              <g key={index}>
                <circle cx={x} cy={y} r="6" fill={color} stroke="white" strokeWidth="2" />
                <circle cx={x} cy={y} r="10" fill={color} fillOpacity="0.2" />
              </g>
            );
          })}
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-600 font-medium">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
  size?: number;
}

export function PieChart({ data, title, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    const radius = size / 2 - 10;
    const x1 = size / 2 + radius * Math.cos(startAngleRad);
    const y1 = size / 2 + radius * Math.sin(startAngleRad);
    const x2 = size / 2 + radius * Math.cos(endAngleRad);
    const y2 = size / 2 + radius * Math.sin(endAngleRad);
    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${size / 2} ${size / 2}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return { pathData, percentage, label: item.label, color: item.color };
  });

  return (
    <div className="w-full">
      <h3 className="font-semibold text-lg mb-6 text-gray-800">{title}</h3>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className="transition-all hover:opacity-80"
              />
            ))}
          </svg>
        </div>
        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{segment.label}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {segment.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

export function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`${color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-8 h-8 opacity-90" />
          {change && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
              trend === 'up' ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </div>
          )}
        </div>
        <p className="text-white/80 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}
