
import Form from "react-bootstrap/Form";
import { getLists, postList } from "./service/ListService";
import { useState } from "react";

function App() {


  const [state, setState] = useState("");
  const [result, setResult] = useState("");
  const [items, setItems] = useState([]);

  const onClickSaveList = () => {
    postList(JSON.parse(state)).then(() => {
      setResult("List created successfully.")
     });
  };

  const onClickGetList = () => {
    getLists().then((val) => {
      setItems(val);
      setResult("Lists fetched successfully.")
    });
  };
  
  return (

    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control as="textarea"
            value={state}
            onChange={e => setState(e.target.value)}
            rows={10} />
        </Form.Group>
        <button onClick={() => onClickSaveList()}
          type="button">Create List
        </button> <br/><br/>
        <button onClick={() => onClickGetList()}
          type="button">Get List
        </button>
      </Form>
      ------------------------------------------<br/>
      {result}<br/>
      ------------------------------------------
      {
        items && items.map((item) => {
          return (
            <div>
              listId:{item.listId}<br/>
              description:{item.description}<br />
              name:{item.name}<br />
              views:{item.views}<br />
              ************************
            </div>)
        })
      }         
    </div>
  );
}

export default App;
