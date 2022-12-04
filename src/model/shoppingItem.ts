import {Transaction} from "./transaction";
import {Item} from "./item";

export interface ShoppingItem {
    item: Item;
    transaction: Transaction;
}