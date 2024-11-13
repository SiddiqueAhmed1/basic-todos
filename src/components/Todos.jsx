import { useState } from "react";
import "./Todos.css";

const Todos = () => {
  const [input, setInput] = useState({
    title: "",
    type: "",
  });

  // input value
  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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
              <button className="form-control btn btn-sm btn-info">Add</button>
            </div>
          </div>
        </div>
        <hr />
        <div className="todos">
          <div className="row">
            <div className="col-lg-4 text-center mt-5">
              <h1>hello</h1>
            </div>
            <div className="col-lg-4 text-center mt-5">
              <div className="pending-todos">
                <h2 className=" d-inline-block p-3">Pending</h2>
                <hr />
                <ul>
                  <li className="d-flex justify-content-between bg-warning p-2 align-items-center mb-2">
                    {" "}
                    Go to school{" "}
                    <button className="btn btn-sm btn-success">
                      Complete{" "}
                    </button>
                  </li>
                  <li className="d-flex justify-content-between bg-warning p-2 align-items-center mb-2">
                    {" "}
                    Go to school{" "}
                    <button className="btn btn-sm btn-success">
                      Complete{" "}
                    </button>
                  </li>
                  <li className="d-flex justify-content-between bg-warning p-2 align-items-center mb-2">
                    {" "}
                    Go to school{" "}
                    <button className="btn btn-sm btn-success">
                      Complete{" "}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 text-center mt-5">
              <h1>hello</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
