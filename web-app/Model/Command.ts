import {Articles} from './Articles'
export interface Command {
    objectid:string,
    customerId: string;
    restorantId:string;
    date:Date,
    articles: Articles;
    price:number;
}

export class Command implements Command{
    constructor(
        public objectid:string,
        public customerId:string,
        public restorantId:string,
        public date: Date, 
        public articles: Articles,
        public price:number
    ){}
}