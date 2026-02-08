interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">{title}</h3>
      <div className="space-y-3 sm:space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-xs sm:text-sm text-muted-foreground">{item.label}</span>
              <span className="text-xs sm:text-sm font-semibold">{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="h-2 sm:h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || '#3b82f6',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  title: string;
}

export function LineChart({ data, title }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">{title}</h3>
      <div className="relative h-48 sm:h-64">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <polyline
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 400;
                const y = 200 - ((item.value - minValue) / range) * 180 - 10;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 400;
            const y = 200 - ((item.value - minValue) / range) * 180 - 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
              />
            );
          })}
        </svg>
        
        <div className="flex justify-between mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-muted-foreground">
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
