import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { fetchData } from './store/slices/apiSlice';
import Header from './components/header';
import Toolbar from './components/toolbar';
import Bots from './components/bots';
import ChartBoard from './components/chartBoard';
import './App.css'

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const [pageName, setPageName] = useState('Dashboard');

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <>
            <div className="info">Приложение для мобильных <br/>разрешений до 1200px!</div>
            <div className='app'>
                <Header pageName={pageName} />

                {/* контент */}
                <ChartBoard />
                <Bots />
                {/* окончание */}

                <Toolbar setPageName={setPageName} />
            </div>
        </>
    )
}

export default App
