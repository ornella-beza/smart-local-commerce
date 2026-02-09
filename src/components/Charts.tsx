import { useState } from 'react';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
}

export function BarChart({ data, title }: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">{title}</h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2 relative">
              <div className="relative w-full">
                {hoveredIndex === index && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded text-xs font-bold whitespace-nowrap z-10 shadow-lg">
                    {item.value.toLocaleString()}
                  </div>
                )}
                <div
                  className="w-full rounded-t-lg transition-all duration-300 cursor-pointer hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    minHeight: '20px',
                    backgroundColor: item.color || '#3b82f6',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium">{item.label}</span>
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
}

export function LineChart({ data, title }: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value));
  const chartHeight = 200;
  const padding = 20;

  return (
    <div className="w-full">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">{title}</h3>
      <div className="relative" style={{ height: chartHeight + 40 }}>
        <svg width="100%" height={chartHeight} className="overflow-visible">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * (chartHeight / 4)}
              x2="100%"
              y2={i * (chartHeight / 4)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <path
            d={`M 0 ${chartHeight} ` +
              data
                .map((d, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const y = chartHeight - (d.value / maxValue) * (chartHeight - padding);
                  return `L ${x}% ${y}`;
                })
                .join(' ') +
              ` L 100% ${chartHeight} Z`}
            fill="url(#lineGradient)"
          />

          {/* Line path */}
          <path
            d={data
              .map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = chartHeight - (d.value / maxValue) * (chartHeight - padding);
                return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = chartHeight - (d.value / maxValue) * (chartHeight - padding);
            return (
              <g key={i}>
                <circle
                  cx={`${x}%`}
                  cy={y}
                  r={hoveredIndex === i ? "7" : "5"}
                  fill="white"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  className="cursor-pointer transition-all drop-shadow-md"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {hoveredIndex === i && (
                  <>
                    <rect
                      x={`calc(${x}% - 35px)`}
                      y={y - 45}
                      width="70"
                      height="32"
                      fill="#1f2937"
                      rx="6"
                      className="drop-shadow-lg"
                    />
                    <text
                      x={`${x}%`}
                      y={y - 24}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {d.value}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
          {data.map((d, i) => (
            <span key={i}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
