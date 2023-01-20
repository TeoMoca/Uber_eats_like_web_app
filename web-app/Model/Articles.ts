import { Menu } from "./Menu";
import { Item } from "./Item";

export interface Articles {
  menu: Menu[];
  item: Item[];
}

export class Articles implements Articles {
  constructor(public menu: Menu[], public item: Item[]) {}
}
