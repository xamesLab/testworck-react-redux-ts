import React, { useState } from 'react';
import ToolbarItem from './ToolbarItem';
import './style.css';

const TOOLBAR_DATA = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        iconType: 'dashboard',
        countTip: 0,
        isActive: true,
    },
    {
        id: 'megabot',
        name: 'Megabot',
        iconType: 'chart',
        countTip: 0,
        isActive: false,
    },
    {
        id: 'market',
        name: 'Bot market',
        iconType: 'cart',
        countTip: 0,
        isActive: false,
    },
    {
        id: 'coin',
        name: 'Coin prices',
        iconType: 'coin',
        countTip: 0,
        isActive: false,
    },
    {
        id: 'profile',
        name: 'Profile',
        iconType: 'settings',
        countTip: 3,
        isActive: false,
    },
]

const Toolbar: React.FC<{setPageName: (value: string) => void}> = ({setPageName}) => {
    const [toolbar, setToolbar] = useState(TOOLBAR_DATA);

    const toggleActive = (id: string) => {    
        // обновляем тулбар    
        setToolbar((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isActive: true } : { ...item, isActive: false }
            )
        );
        // обновляем название страницы
        setPageName(toolbar.find(item => item.id === id)?.name || '');
    };

    return (
        <div className="toolbar">
            {toolbar.map(({name, id, iconType, countTip, isActive}) => (
                <ToolbarItem 
                    key={id}
                    onClick={() => toggleActive(id)}
                    name={name} 
                    iconType={iconType} 
                    countTip={countTip} 
                    isActive={isActive} 
                />
            ))}
        </div>
    );
};
  
export default Toolbar;