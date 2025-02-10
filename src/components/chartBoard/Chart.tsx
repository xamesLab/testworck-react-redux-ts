import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart: React.FC = () => {
    // данные для графика из стора
    const mockData = useSelector((state: RootState) => state.counter.chartData);

    // создаем градиент для графика
    const createGradient = (ctx: CanvasRenderingContext2D) => {
        const canvasHeight = ctx.canvas.height;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, 'rgb(10, 76, 134)');
        gradient.addColorStop(0.45, 'rgba(10, 76, 134, 0)');
        gradient.addColorStop(1, 'rgba(10, 76, 134, 0)');
        return gradient;
    };

    const data = {
        labels: mockData.labels,
        datasets: [
            {
                label: 'Growth',
                data: mockData.data,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    return createGradient(ctx);
                },
                borderColor: '#0283e5',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                pointBackgroundColor: '#0283e5',
            },
        ],
    };

    const verticalLinesPlugin = {
        id: 'verticalLinesPlugin',
        beforeDraw: (chart: any) => {
            const { ctx, chartArea, scales } = chart;
            const points = chart.getDatasetMeta(0).data;    

            if (!chartArea) return;

            ctx.save();
            ctx.setLineDash([3, 2]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#08385f';

            points.forEach((point: any, index: number) => {
                // вычисляем положение вртикальной линии
                const hasLine = index === 6 || !((index - 6) % 13);
                if(hasLine){          
                const x = point.x;
                const y = point.y;
                const baseY = scales.y.bottom;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, baseY);
                ctx.stroke();
                ctx.closePath();
                }
            });

            ctx.restore();
        },
    };

    const horizontalLinesPlugin = {
        id: 'horizontalLinesPlugin',
        beforeDraw: (chart: any) => {
            const { ctx, chartArea } = chart;
            const { left, right, bottom, top } = chartArea;
            const spacing = 40;
        
            ctx.save();
            ctx.strokeStyle = '#1c2e45';
            ctx.lineWidth = 1;
        
            for (let y = bottom; y >= top; y -= spacing) {
                ctx.beginPath();
                ctx.moveTo(left, y);
                ctx.lineTo(right, y);
                ctx.stroke();
                ctx.closePath();
            }
        
            ctx.restore();
        },
    };

    ChartJS.register(verticalLinesPlugin);
    ChartJS.register(horizontalLinesPlugin);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                external: (context: any) => {
                    // Кастомный тултип
                    const { tooltip } = context;
                    const tooltipEl = document.getElementById('custom-tooltip');
                    if(!tooltipEl) return;
                
                    // Стили и контент тултипа
                    tooltipEl.style.opacity = '1';
                    tooltipEl.innerHTML = `+${tooltip.dataPoints[0].raw}%`;
                },
            },
            horizontalLinesPlugin,
        },
        interaction: {
            mode: 'nearest' as 'nearest',
            axis: 'x' as 'x',
            intersect: false,
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                offset: false,
                ticks: {
                    display: false,
                    padding: 0,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
                min: Math.min(...data.datasets[0].data) - 15,
                max: Math.max(...data.datasets[0].data) + 15,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;