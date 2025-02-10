import React from 'react';
import ItemSvg from './ItemsSvg';
import './style.css';

interface ItemProps {
    name: string;
    iconType: string;
    isActive: boolean;
    countTip: number;
    onClick: () => void;
}

const ToolbarItem: React.FC<ItemProps> = ({name, isActive, iconType, onClick, countTip}) => {
    return (
        <div onClick={onClick} className={`toolbar-item ${isActive ? 'toolbar-item_active' : ''}`}>
            {!!countTip && <div className="toolbar-item__tip">{countTip}</div>}
            <ItemSvg type={iconType} />
            {name}
        </div>
    );
};
  
export default ToolbarItem;