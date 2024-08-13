import React, {useEffect, useState} from "react";
import Create from './Create.jsx' 
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';


function Home(){
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')  // Corrected the URL
            .then(result => {
                setTodos(result.data);  // Update state with the fetched data
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);  // Log the error
                alert("Failed to load tasks. Please try again later.");  // Show an error alert
            });
    }, []);
    
    const handleEdit = (id) => {
      axios.put('http://localhost:3001/update/' + id)  // Corrected the URL
            .then(result => 
              location.reload()
            )
            .catch(err => {
                console.error("Error in updating", err);  // Log the error
                alert("Failed to update task. Please try again later.");  
            });

    }

    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/delete/' + id)  // Corrected the URL
            .then(result => 
              location.reload()
            )
            .catch(err => {
                console.error("Could not delete item", err);  // Log the error
                alert("Could not delete item. Please try again later.");  
            });

    }

    return (
        <div className='home'>
        <h2>Todo List</h2>
        <br></br>
        <Create />
        {
          todos.length === 0 
          ?
          <div ><h2>No record</h2></div>
          :
          todos.map(todo => (
            <div className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ?
              <i className="icon bi bi-check-circle-fill"></i> :
              <i className="icon bi bi-circle-fill"></i>
              }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><i className="bi bi-trash-fill" 
              onClick={() => handleDelete(todo._id)}></i></span> 
            </div>
          </div>
          
          ))
        }
  
      </div>
    )
}

export default Home