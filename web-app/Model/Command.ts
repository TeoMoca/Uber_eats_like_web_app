import { Articles } from "./Articles";
export interface Command {
  objectid: string;
  customerId: string;
  restorantId: string;
  date: Date;
  articles: Articles;
  price: number;
  adress: string;
  city: string;
  codePostal: string;
  idPaid: boolean;
  isAcceptedByRestaurateur: boolean;
  isInDelivery: boolean;
}

export class Command implements Command {
  constructor(
    public objectid: string,
    public customerId: string,
    public restorantId: string,
    public date: Date,
    public articles: Articles,
    public price: number,
    public adress: string,
    public city: string,
    public codePostal: string,
    public idPaid: boolean,
    public isAcceptedByRestaurateur: boolean,
    public isInDelivery: boolean
  ) {}
}
