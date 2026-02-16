import React from 'react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface StatCardProps {
  title: string;
  value: number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}

export function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <div className={`${color} rounded-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={`text-sm ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
              {change}
            </p>
          )}
        </div>
        <Icon className="w-8 h-8 opacity-80" />
      </div>
    </div>
  );
}

export function EnhancedBarChart({ data, title }: { data: ChartData[]; title: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-sm w-20">{item.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%`,
                  backgroundColor: item.color || '#3b82f6'
                }}
              />
            </div>
            <span className="text-sm font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnhancedLineChart({ data, title, color }: { data: ChartData[]; title: string; color: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="h-64 flex items-end gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-t"
              style={{
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 200}px`,
                backgroundColor: color
              }}
            />
            <span className="text-xs mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PieChart({ data, title }: { data: ChartData[]; title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const createSlicePath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(100, 100, 80, endAngle);
    const end = polarToCartesian(100, 100, 80, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', 100, 100,
      'L', start.x, start.y,
      'A', 80, 80, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="flex items-center gap-8">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const path = createSlicePath(currentAngle, currentAngle + angle);
            currentAngle += angle;
            return (
              <path
                key={index}
                d={path}
                fill={item.color || '#3b82f6'}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="flex-1 space-y-3">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color || '#3b82f6' }}
                />
                <span className="text-sm flex-1">{item.label}</span>
                <span className="text-sm font-semibold">{item.value} ({percentage}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}