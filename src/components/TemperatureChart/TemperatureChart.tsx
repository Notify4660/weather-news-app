import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {formatDateForGraphics} from '../../utils/dateFormatters';
import {formatTemperature} from '../../utils/weatherHelpers';
import { useTheme } from '../../contexts/ThemeContext';

interface ForecastDataProps{
    /** Array of wather forecast entries */
    list: Array<{
        /** Unix timestamp (UTC) */
        dt: number, 
        main:{
            /** Temperature in Celsius */
            temp: number, 
        };
    }>;
    /** City information for timezone offset */
    city: { 
        /** City name */
        name: string, 
        /** Timezone offset in seconds from UTC */
        timezone: number
    };
}

/**
 * Temperature trend chart for 5-day weather forecast
 * 
 * Displays temperature changes over time using a line chart.
 * Automatically adjusts timezone and formats temperatures.
 * 
 * @component
 */

const TemperatureChart: React.FC<ForecastDataProps> = (weatherForecast) => {
    if(!weatherForecast || !weatherForecast.list || weatherForecast.list.length === 0) return null;

    const data = weatherForecast.list.map(item => {
        const objData = {
            time: formatDateForGraphics(item.dt), 
            temp: formatTemperature(item.main.temp)
        }
        return objData
    })

    /* We are assembling an array of dates to find the min and max temp */
    const temps = data.map(d => d.temp);
    const minTemp = Math.min(...temps) - 2;
    const maxTemp = Math.max(...temps) + 2;
    
    const { theme } = useTheme();
    const isDark = theme === 'dark';

      // Цвета для светлой и тёмной темы
    const colors = {
        text: isDark ? '#a9abaf' : '#475569',          // текст осей
        axis: isDark ? '#334155' : '#E2E8F0',          // линии осей
        grid: isDark ? '#1E293B' : '#E2E8F0',          // сетка (для CartesianGrid)
        tooltipBg: isDark ? '#1E293B' : 'rgba(255, 255, 255, 0.95)',
        tooltipText: isDark ? '#F8FAFC' : '#0F172A',
        tooltipLabel: isDark ? '#94A3B8' : '#475569',
        tooltipBorder: isDark ? '#334155' : 'rgba(255, 255, 255, 0.5)',
        line: isDark ? '#1D4ED8' : '#F59E0B',           // жёлтая линия
        dotFill: isDark ? '#D1D5DB' : '#FFFFFF',
        dotStroke: isDark ? '#1D4ED8' : '#F59E0B',
        cursor: isDark ? '#475569' : '#CBD5E1',
    };

    return(
        <div className='w-full h-full p-4'>
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <XAxis 
                    dataKey='time' 
                    tick={{
                        fill: colors.text, 
                        fontSize: 10, 
                        fontWeight: 400
                    }} 
                    tickMargin={6} 
                    interval={7}
                    padding={{ left: 5, right: 5 }}
                    axisLine={{ stroke: colors.axis, strokeWidth: 1 }}
                    tickLine={false}
                    />
                    <YAxis 
                    dataKey='temp' 
                    unit='°C'  
                    domain={[minTemp, maxTemp]}
                    tick={{ 
                        fill: colors.text, 
                        fontSize: 10,
                        fontWeight: 400
                    }}
                    width={35}
                    axisLine={{ stroke: colors.axis, strokeWidth: 1 }}
                    tickLine={false}
                    />
                    <Tooltip 
                    cursor={{ 
                            stroke: colors.cursor, 
                            strokeWidth: 1,
                            strokeDasharray: '4 4'
                        }}
                        labelFormatter={(date) => `📅 ${date}`}
                        formatter={(value) => [`${value}°C`, 'Temperature']}
                        contentStyle={{
                            padding: '8px 12px',
                            background: colors.tooltipBg,
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${colors.tooltipBorder}`,
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            fontSize: '12px',
                            color: colors.tooltipText
                        }}
                        labelStyle={{
                            fontWeight: 500,
                            color: colors.tooltipLabel
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="temp" 
                        stroke={colors.line}
                        strokeWidth={2.5}
                        dot={{
                            fill: colors.dotFill,
                            stroke: colors.dotStroke,
                            strokeWidth: 2,
                            r: 4
                        }}
                        activeDot={{
                            r: 6,
                            fill: colors.dotFill,
                            stroke: colors.dotStroke,
                            strokeWidth: 2
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TemperatureChart;