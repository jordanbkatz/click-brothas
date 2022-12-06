import { IBrotha } from './models/brotha';

class Game {
    brothas: IBrotha[];
    waiting: boolean;
    constructor() {
        this.brothas = [];
        this.waiting = this.checkWaiting();
    }
    checkWaiting() {
        return Math.floor(new Date().getSeconds() / 10) % 2 === 0;
    }
    update() {
        if (this.waiting && !this.checkWaiting()) {
            this.brothas = this.brothas.map((brotha) => {
                return { ...brotha, clicks: 0 };
            });
        }
        this.waiting = this.checkWaiting();
    }
    addBrotha(id: string) {
        if (!this.brothas.find((brotha) => brotha.id === id)) {
            this.brothas.push({ id, name: '', clicks: 0 });
        }
    }
    removeBrotha(id: string) {
        this.brothas = this.brothas.filter((brotha) => {
            return brotha.id !== id;
        });
    }
    changeName(id: string, name: string) {
        this.brothas = this.brothas.map((brotha) => {
            return brotha.id === id ? { ...brotha, name } : brotha;
        });
    }
    click(id: string) {
        this.brothas = this.brothas.map((brotha) => {
            return {
                ...brotha,
                clicks: (brotha.id === id) ? brotha.clicks + 1 : brotha.clicks
            };
        });
    }
}

export default Game;