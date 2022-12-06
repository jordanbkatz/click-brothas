import { IBrotha } from '../models/brotha';

interface IBrothaProps extends IBrotha {
    rank: number;
    clientId: string;
}

const Brotha: React.FC<IBrothaProps> = ({ id, rank, name, clicks, clientId }) => {
    return (
        <tr className={`brotha ${id === clientId ? 'active' : ''}`}>
            <td>{rank}</td>
            <td>{name ? name : 'Anonymous'}</td>
            <td>{clicks}</td>
        </tr>
    );
}

export default Brotha;