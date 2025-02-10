import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRandom } from "../../store/slices/dataSlice";
import { RootState } from '../../store';
import { Range } from '../../types';
import './style.css';

const RANGE_LIST = [
    {
        id: '24h',
        name: '24h',
        isActive: false,
    },
    {
        id: '7d',
        name: '7 days',
        isActive: false,
    },
    {
        id: '30d',
        name: '30 days',
        isActive: false,
    },
    {
        id: 'all_time',
        name: 'All time',
        isActive: false,
    },
]

const BOT_LIST = [
    {
        "name": "orange_bot",
        "title": "attack",
        "img": "/images/bot-1.png",
        "currentValue": 0,
        "cost": 550,
        "24h": 210.1,
        "7d": 81.3,
        "30d": 90.7,
        "60d": 13.4,
        "90d": -40.6,
        "all_time": 98.67,
        "isActive": true,
    },
    {
        "name": "empty_bot",
        "title": "place bot",
        "img": "/images/bot-2.png",
        "currentValue": 0,
        "cost": 0,
        "24h": 0,
        "7d": 0,
        "30d": 0,
        "60d": 0,
        "90d": 0,
        "all_time": 0,
        "isActive": false,
    },
    {
        "name": "blue_bot",
        "title": "balance",
        "img": "/images/bot-3.png",
        "currentValue": 0,
        "cost": 7400,
        "24h": -6.5,
        "7d": -4.3,
        "30d": -0.17,
        "60d": 4.32,
        "90d": 6.8,
        "all_time": 10.1,
        "isActive": false,
    },
    {
        "name": "green_bot",
        "title": "defence",
        "img": "/images/bot-4.png",
        "currentValue": 0,
        "cost": 4200,
        "24h": 3.33,
        "7d": -17.6,
        "30d": -2.5,
        "60d": 13.0,
        "90d": 25.1,
        "all_time": 4.99,
        "isActive": false,
    },
    {
        "name": "yellow_bot",
        "title": "megabot",
        "img": "/images/bot-5.png",
        "currentValue": 0,
        "cost": 10000,
        "24h": 3.15,
        "7d": 0.065,
        "30d": 4.1,
        "60d": 15.04,
        "90d": 80.25,
        "all_time": 126.85,
        "isActive": false,
    },
    {
        "name": "red_bot",
        "title": "attack",
        "img": "/images/bot-6.png",
        "currentValue": 0,
        "cost": 1500,
        "24h": -10.8,
        "7d": 5.5,
        "30d": 11.4,
        "60d": 12.1,
        "90d": 24.36,
        "all_time": 71.0,
        "isActive": false,
    },
]

// Загрузка данных из localStorage
const loadFromLocalStorage = (key: string) => {
    try {
      const data = localStorage.getItem(key);
      return data || null;
    } catch (error) {
      console.error("Ошибка при загрузке из localStorage", error);
      return null;
    }
  };

const Bots: React.FC = () => {
    const dispatch = useDispatch();

    const [range, setRange] = useState(RANGE_LIST);
    const [activeRange, setActiveRange] = useState<Range>(loadFromLocalStorage('activeRangeCurrent') as Range || 'all_time');
    const [activeBot, setActiveBot] = useState(loadFromLocalStorage('activeBotCurrent') || 'orange_bot');
    const [botList, setBots] = useState(BOT_LIST);

    const { data } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        setBots((prevItems) =>
            prevItems.map((item) => {
                if(!data) return { ...item, currentValue: 0 };
                const bot = data.bots.find(({name}) => name === item.name);
                const currentValue = bot ? bot[activeRange] : 0;
                return { ...item, currentValue }
            })
        );
    }, [data, activeRange]);

    useEffect(() => {
        if(activeBot !== 'empty_bot') dispatch(getRandom());
    }, [activeBot]);

    useEffect(() => {
        rangeItemActive(activeRange);
        setBotActive(activeBot);
    }, [activeRange, activeBot]);

    const rangeItemActive = (id: Range) => {  
        setRange((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
            )
        );
        setActiveRange(id);
        try {
            localStorage.setItem("activeRangeCurrent", id);
        } catch (error) {
            console.error("Ошибка при сохранении в localStorage", error);
        }
    };

    const setBotActive = (name: string) => {  
        setBots((prevItems) =>
            prevItems.map((item) =>
                item.name === name ? { ...item, isActive: true } : { ...item, isActive: false }
            )
        );
        setActiveBot(name);
        try {
            localStorage.setItem("activeBotCurrent", name);
        } catch (error) {
            console.error("Ошибка при сохранении в localStorage", error);
        }
    };
    return (
        <div className="bots">
            <div className="bots__grid">
                {
                    botList.map(({name, isActive, img, title, currentValue}) => (
                        <div 
                            key={name}
                            onClick={() => setBotActive(name)}
                            className={`bots__item bot ${isActive && 'bots__item_active'} ${name === 'empty_bot' && 'bot_empty'}`}
                        >
                            <div className="bot__wrapp">
                                <img src={img} alt="" />
                                <p className={`bot__title ${name === 'yellow_bot' && 'bot__title_custom'}`}>{title}</p>
                                {name === 'empty_bot' && <p className="bot__title">here</p>}
                                {name !== 'empty_bot' && <p className={
                                    `bot__value ${currentValue < 0 && 'bot__value_nt'}`
                                    }
                                >
                                    {currentValue}%
                                </p>}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="bots__range">
                <span className="bots__range-title">Time Range:</span>
                <ul className="bots__btns">
                    {
                        range.map(({id, name, isActive}) => (
                            <li key={id} onClick={() => rangeItemActive(id as Range)}>
                                <div className={`bots__btn ${isActive ? 'bots__btn_active' : ''}`}>{name}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};
  
export default Bots;