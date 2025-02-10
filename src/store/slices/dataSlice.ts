import { createSlice } from '@reduxjs/toolkit';

interface ChartData {
    labels: string[];
    periods: string[];
    data: number[];
}

interface DataState {
    chartData: ChartData;
}

// функция для получения раддомных данных графика
const generateChartData = (num1: number, num2: number): ChartData => {
    if (num1 > num2) {
        [num1, num2] = [num2, num1];
    }

    return {
        labels: Array(65).fill(""), // 65 пустых строк
        periods: ['22.04', '23.04', '24.04', '25.04', '26.04'],
        data: Array.from({ length: 65 }, () => Number((Math.random() * (num2 - num1) + num1).toFixed(1))), // 65 случайных чисел
    };
}

const initialState: DataState = {
    chartData: {
        labels: [],
        periods: [],
        data: [],
    }
};

const dataSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        getRandom: (state) => {
        state.chartData = generateChartData(50, 60);
        },
    },
});

export const { getRandom } = dataSlice.actions;
export default dataSlice.reducer;