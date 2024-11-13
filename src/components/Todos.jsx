import { useEffect, useState } from "react";
import "./Todos.css";
import axios from "axios";
import Swal from "sweetalert2";

const Todos = () => {
  // input state
  const [input, setInput] = useState({
    title: "",
    type: "",
  });
  // todos state
  const [todos, setTodo] = useState([]);

  //pending todo state
  const [pendingTodo, setPendingTodo] = useState([])

  // input value
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // create todos
  const createTodo = async (e) => {
    e.preventDefault();

    if (!input.title || !input.type) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      await axios.post("http://localhost:7070/todos", input);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo saved successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setInput({
        title: "",
        type: "",
      });
    }
    setTimeout(() => {
      getTodo()
    }, 1000);
  };

  // get todo
  const getTodo = async () => {
    const response = await axios.get("http://localhost:7070/todos");
    setTodo(response.data);
  };

  // pending todo
  const pendingTodos =async  () => {
    const response = await axios.get("http://localhost:7070/todos?type=pending")
    setPendingTodo(response.data)
  }

  useEffect(() => {
    pendingTodos()
  }, []);

  return (
    <>
      <div className="container mt-3">
        <div className="todos-header text-center mb-3">
          <h1>Todos</h1>
          <p>My Tasks</p>
        </div>
        <div className="todos-form ">
          <div className="row justify-content-center">
            <div className="col-lg-4 ">
              <form onSubmit={createTodo}>
                <input
                  onChange={handleInput}
                  name="title"
                  value={input.title}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Type your todo"
                />

                <select
                  onChange={handleInput}
                  name="type"
                  className="form-select mb-2"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Deleted">Deleted</option>
                </select>
                <button
                  type="submit"
                  onClick={createTodo}
                  className="form-control btn btn-sm btn-info"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
        <hr />
        <div className="todos">
          <div className="row">
            <div className="col-lg-4 text-center">
              <h1>hello</h1>
            </div>
            <div className="col-lg-4 text-center ">
              <div className="pending-todos">
                <h2 className=" d-inline-block p-3">Pending</h2>
                <hr />
                <ul>
                  {pendingTodo?.length > 0 ? (
                    pendingTodo.map((item, index) => (
                      <li className="d-flex justify-content-between bg-warning p-2 align-items-center mb-2">
                     {index + 1}. {item.title}
                      <button className="btn btn-sm btn-success">
                        Complete
                      </button>
                    </li>
                    ))
                  ) : (
                    <li>No todos found</li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <h1>hello</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
