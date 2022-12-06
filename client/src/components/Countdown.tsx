interface ICountdownProps {
    waiting: boolean;
}

const Countdown: React.FC<ICountdownProps> = ({ waiting }) => {
    const timeRemaining = 10_000 - (Date.now() % 10_000);
    const hue = (timeRemaining / 10_000) * 120;
    const secondsRemaining = 10 - new Date().getSeconds() % 10;
    return (
        <div className="countdown" style={!waiting ? {backgroundColor: `hsl(${hue}, 100%, 50%)`} : {}}>
            <h1>{secondsRemaining}</h1>
        </div>
    );
}

export default Countdown;