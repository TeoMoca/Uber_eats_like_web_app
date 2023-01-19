export interface Item {
  objectid: string;
  id_restaurant: number;
  name: string;
  picture: string;
  description: string;
  type: string;
  price: number;
  quantity: number;
}

export class Item implements Item {
  constructor(
    public objectid: string,
    public id_restaurant: number,
    public name: string,
    public picture: string,
    public description: string,
    public type: string,
    public price: number,
    public quantity: number
  ) {}
}
