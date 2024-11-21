import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const adosReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return action.payload;
    case "DELETE":
      return state.filter((data) => data != action.payload);
    case "EDIT":
      return state.map((item) => item.id === action.payload.id ? { ...item, ...action.payload} : item)
      case "FILTER_ADOS":
        return state.filter((data) => data.type === action.payload);
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
    if (input.id) {
      const response = await axios.put(
        `http://localhost:7070/todos/${input.id}`,
        input
      );
      dispatch({ type: "EDIT", payload: response.data });
    } else {
      const response = await axios.post("http://localhost:7070/todos", input);
      dispatch({ type: "CREATE", payload: response.data });
    }

    setInput({
      title: "",
      type: "Pending",
    });
  };

  // delete todos
  const handleDelete = async (id) => {
    const response = await axios.delete(`http://localhost:7070/todos/${id}`);
    dispatch({ type: "DELETE", payload: response.data });
    getTodo();
  };
  // handle edit
  const handleEdit = async (id) => {
    const response = ados.find((data) => data.id === id);
    setInput({
      id: response.id,
      title: response.title,
      type: response.type,
    });
    
  };

  //type wise todos
  const handleType = (type) => {
    dispatch({ type : 'FILTER_ADOS', payload : type})
  }

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
            <div className="card shadow">
              <div className="card-body">
                <div className="todos-form d-flex gap-2">
                  <input
                    className="form-control w-50"
                    onChange={handleInput}
                    name="title"
                    value={input.title}
                    type="text"
                    placeholder="Type todo"
                  />
                  <select
                    className="form-select w-25"
                    onChange={handleInput}
                    name="type"
                  >
                    <option onChange={() => handleType('Pending')} value="Pending">Pending</option>
                    <option onChange={() => handleType('Completed')} value="Completed">Completed</option>
                    <option onChange={() => handleType('Deleted')} value="Deleted">Deleted</option>
                  </select>
                  <button
                    className="btn btn-sm btn-success w-25"
                    onClick={createTodo}
                  >
                    {input.id ? "Update" : "Create"}
                  </button>
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
                              <div className="todos-action">
                                <button
                                  onClick={() => handleEdit(item.id)}
                                  className="btn btn-sm btn-warning me-2"
                                >
                                  <FaRegEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="btn btn-sm btn-danger"
                                >
                                  X
                                </button>
                              </div>
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
