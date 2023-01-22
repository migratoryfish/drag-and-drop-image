//declare export function getRandomTrump(): string
export function getRandomInt(min:number, max:number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  export function getRandomIntInclusive(min:number, max:number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  export function getRandomTrump():string {
    const trumNumber:number = getRandomIntInclusive(1, 13);
    const trumpTypes:string[] = ['c', 'd', 'h', 's'];
    const trumpType:string  = trumpTypes[getRandomInt(0,4)];

    const trump:string = trumpType + String(trumNumber).padStart(2,'0');

    return trump;
  }