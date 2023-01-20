import { Item } from './Item';
export interface Command {
    objectid:string,
    customerId: string;
    restorantId:string;
    date:Date,
    articles: Item[];
    price:number;
}

export class Command implements Command{
    constructor(
        public objectid:string,
        public customerId:string,
        public restorantId:string,
        public date: Date, 
        public articles: Item[],
        public price:number
    ){}
}