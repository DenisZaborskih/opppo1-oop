import { AbstractMovie } from "./abstract-movie";

export enum CreationType { ComputerAnimation = '3D-графика', Printed = 'Рисованный', Doll = 'Кукольный', Clay = 'Плстилиновый' };

export class Cartoon extends AbstractMovie {
    constructor(public name: string, public author: string, public creation: CreationType) {
        super();
    }

    override print(): void {
        console.log(`Мультфильм ${this.name}, режиссёр: ${this.author}, тип анимации: ${this.creation}`);
    }

}
