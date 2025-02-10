import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import LineChart from './Chart';
import './style.css';

const ChartBoard: React.FC = () => {
    const { data } = useSelector((state: RootState) => state.data);
    const chartData = useSelector((state: RootState) => state.counter.chartData);

    if (!data) return;

    const { 
        trading_capital, 
        trading_capital_currency, 
        balance, 
        on_hold 
    } = data;

    const { periods } = chartData;
    
    return (
        <div className="chart-board">
            <div className="chart-board__head">
                <div className="chart-board__title">trading capital</div>
                <div className="chart-board__balance-wrapp">
                    <div className="chart-board__balance">{trading_capital} {trading_capital_currency}</div>
                    <div className="chart-board__balance-detail balance-detail">
                        <div className="balance-detail__item">
                            <div className="balance-detail__name">balance<span>:</span></div>
                            <div className="balance-detail__value">{balance}</div>
                        </div>
                        <div className="balance-detail__item">
                            <div className="balance-detail__name">on hold<span>:</span></div>
                            <div className="balance-detail__value">{on_hold}</div>
                        </div>
                    </div>
                </div>
            </div>
            <LineChart />
            <ul className="chart-board__date-list">
                {
                    periods.map(period => (
                        <li key={period}>{period}</li>
                    ))
                }
            </ul>
            <div className="custom-tooltip" id="custom-tooltip">+36.2%</div>
        </div>
    );
  };
  
  export default ChartBoard;