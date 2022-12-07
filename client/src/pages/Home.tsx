import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { IBrotha } from '../models/brotha';
import Countdown from '../components/Countdown';
import Leaderboard from '../components/Leaderboard';

const socket = io('https://jbk-click-brothas.herokuapp.com');

const Home: React.FC = () => {
    const [clientId, setClientId] = useState<string>('');
    const [brothas, setBrothas] = useState<IBrotha[]>([]);
    const [waiting, setWaiting] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [clicked, setClicked] = useState<boolean>(false);
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        socket.emit('name', e.target.value);
        setName(e.target.value);
    };
    const handleClick = () => {
        if (!waiting) {
            socket.emit('click');
            setClicked(true);
            setTimeout(() => setClicked(false), 50);
        }
    };
    useEffect(() => {
        socket.emit('join');
        socket.on('joined', (data: string) => {
            setClientId(data);
        });
        socket.on('game', (data: { brothas: IBrotha[], waiting: boolean }) => {
            setBrothas(data.brothas);
            setWaiting(data.waiting);
        });
    }, []);
    return (
        <div className="home">
            <div className="header">
                <h1>Click Brothas</h1>
            </div>
            <div className="top">
                <input
                    placeholder="name"
                    maxLength={15}
                    value={name}
                    onChange={handleChangeName}
                    className="name"
                />
                <Countdown waiting={waiting} />
            </div>
            {brothas && brothas.length > 0 ? (
                <>
                    <button className={`click ${clicked ? 'active' : ''}`} onClick={handleClick}>
                        {waiting ? 'Wait For Next Round' : 'Click Me'}
                    </button>
                    <Leaderboard brothas={brothas} clientId={clientId} />
                </>
            ) : null}
        </div>
    );
};

export default Home;