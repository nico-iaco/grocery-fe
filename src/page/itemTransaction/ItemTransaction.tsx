import {useParams} from "react-router-dom";

export function ItemTransaction() {
    const { itemId } = useParams();
    return <div>{itemId}</div>
}
