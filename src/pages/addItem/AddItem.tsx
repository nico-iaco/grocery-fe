import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Item} from "../../model/item";
import {addItem} from "../../api/itemApis";

export function AddItem () {
    const [name, setName] = useState("");
    const [barcode, setBarcode] = useState("");
    const navigate = useNavigate();
    const sendItemToBe = () => {
      const item: Item = {
          id: "",
          name,
          barcode
      };
      addItem(item)
          .then(value => {
              console.log(value);
              navigate("/")
          })
          .catch(reason => console.error(reason));
    };
    return (
        <div>
            <h2>Add Item</h2>
            <b>Name: </b><input type="text" value={name} onChange={(event) => setName(event.target.value)}/><br/>
            <b>Barcode: </b><input type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <button onClick={() => sendItemToBe()}>Add item</button>
        </div>
    );
}
