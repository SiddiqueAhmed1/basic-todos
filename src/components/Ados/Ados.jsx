import axios from "axios";
import type from './type'
import { useEffect, useReducer, useState } from "react";
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Ados.css";


const adosReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return action.payload;
    case "DELETE":
      return state.filter((data) => data != action.payload);
    case "EDIT":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
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
    const response = await axios.get(`http://localhost:7070/todos`).data;
    if (!input.title) {
      toast.error("Opps, All fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        style: {
          color: "black",
          backgroundColor: "white",
        },
      });
    } else if (ados.find((item) => item.title.trim() === input.title.trim() && item.type === input.type)) {
      alert("Data already exist");
    } else if (input.id) {
      const response = await axios.put(
        `http://localhost:7070/todos/${input.id}`,
        input
      );
      dispatch({ type: "EDIT", payload: response.data });
      setInput({
        title: "",
        type: "Pending",
      });
    } else {
      const response = await axios.post("http://localhost:7070/todos", input);
      dispatch({ type: "CREATE", payload: response.data });
      setInput({
        title: "",
        type: "Pending",
      });
      toast.success("Todo Create Succesful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  // cancel update operation
  const cancelUpdateTodo = () => {
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
  const handleEdit = (id) => {
    const response = ados.find((data) => data.id === id);
    setInput({
      id: response.id,
      title: response.title,
      type: response.type,
    });
  };

  //type wise todos
  const handleType = (type) => {
    dispatch({ type: "FILTER_ADOS", payload: type });
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
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="mb-3 text-center" style={{ color: '#9ACD32', fontSize:'40px'}}>Todo App</h2>
            <div className="card shadow">
              <div className="card-body">
                <div className="todos-form d-flex gap-2">
                  <input
                    className="form-control w-25"
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
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Deleted">Deleted</option>
                  </select>
                  {input.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success w-25"
                        onClick={createTodo}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger w-25"
                        onClick={cancelUpdateTodo}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-sm btn-success w-50"
                      onClick={createTodo}
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="todos-body">
            
              <ul>
              {ados?.length > 0 ? <> <div className="div d-flex align-middle">
                <span className="mt-1 me-2">Sort by:</span> <select name="" className="form-select w-25 mb-2">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Deleted">Deleted</option>
                </select>
                </div></> : ''}

                {ados?.length > 0 ? (
                  ados.map((item, index) => {
                    return (
                      <>
                        <div
                          className="found-ados card p-2 align-middle mb-2"
                          style={{ backgroundColor: type(item.type).background }}
                        >
                          <li style={{ color: type(item.type).color}}
                            className=" d-flex justify-content-between align-middle"
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
                        </div>
                      </>
                    );
                  })
                ) : (
                  <>
                    <div
                      className="no-ados-found text-center"
                      style={{ marginTop: "140px" }}
                    >
                      <h3 style={{ marginBottom: "-30px" }}>No todos found</h3>
                      <i style={{ fontSize: "150px", color: "yellowgreen" }}>
                        <FaRegCopy />
                      </i>
                    </div>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ados;
