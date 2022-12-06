import { IBrotha } from '../models/brotha';
import Brotha from './Brotha';

interface ILeaderboardProps {
    brothas: IBrotha[];
    clientId: string;
}

const Leaderboard: React.FC<ILeaderboardProps> = ({ brothas, clientId }) => {
    const sortClicks = (a: IBrotha, b: IBrotha) => {
        return a.clicks >= b.clicks ? -1 : 1;
    }
    return (
        <table className="leaderboard">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Clicks</th>
                </tr>
            </thead>
            <tbody>
                {brothas.sort(sortClicks).map((brotha, i) => (
                    <Brotha key={i} {...brotha} rank={i + 1} clientId={clientId} />
                ))}
            </tbody>
        </table>
    );
}

export default Leaderboard;