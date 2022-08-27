import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getAllItems} from "../../api/itemApis";
import {Item} from "../../model/item";

export function Home () {
    const [itemList, setItemList] = useState<Item[]>([])
    useEffect(() => {
        getAllItems()
            .then(value => {
                console.log(value)
                setItemList(value || [])
            })
            .catch(reason => console.error(reason));
    }, [])
    return (
        <div>
            <h2>Home</h2>
            <p>Test HOME</p>
            <p>
                <table>
                    <tr><td>ID</td><td>Name</td><td>Barcode</td><td>Action</td></tr>
                    {itemList.map(value => {
                        return <tr key={value.id}><td>{value.id}</td><td>{value.name}</td><td>{value.barcode}</td><td></td></tr>
                    })}
                </table>
            </p>


            <Link to="/item">Add item</Link>
        </div>
    );
}
