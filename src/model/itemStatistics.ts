import {Item} from "./item";

export interface ItemStatistics {
    itemsAlmostFinished: Item[] | null;
    itemsInExpiration: Item[] | null;
}
