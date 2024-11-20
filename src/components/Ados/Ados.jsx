import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const adosReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return action.payload;
    case "DELETE":
      return state.filter((data) => data != action.payload);
    case "CREATE":
      return [...state, action.payload];

    default:
      return state;
  }
};

const Ados = () => {
  const [ados, dispatch] = useReducer(adosReducer, []);

  // input value
  const [input, setInput] = useState({
    title: "",
    type: "Pending",
  });

  // get todos from api
  const getTodo = async () => {
    const response = await axios.get("http://localhost:7070/todos");
    dispatch({ type: "GET_TODOS", payload: response.data });
  };

  // create todos
  const createTodo = async () => {
    const response = await axios.post("http://localhost:7070/todos", input);
    dispatch({ type: "CREATE", payload: response.data });
    setInput({
      title : '', 
      type : 'Pending'
    })
  };

  // delete todos
  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:7070/todos/${id}`);
    dispatch({ type: "DELETE", payload: response.data });
   getTodo();
    
  };

  useEffect(() => {
    getTodo();
    
  }, []);
  // input chang
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="todos-form">
                  <input
                    onChange={handleInput}
                    name="title"
                    value={input.title}
                    type="text"
                    placeholder="Type todo"
                  />
                  <select onChange={handleInput} name="type">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                  <button onClick={createTodo}>Create</button>
                </div>
                <hr />
                <div className="todos-body">
                  <ul>
                    {ados?.length > 0
                      ? ados.map((item, index) => {
                          return (
                            <li
                              className="d-flex justify-content-between mb-1 align-middle"
                              key={index}
                            >
                              {index + 1}. {item.title}{" "}
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-sm btn-warning"
                              >
                                X
                              </button>
                            </li>
                          );
                        })
                      : "No ados found"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ados;
