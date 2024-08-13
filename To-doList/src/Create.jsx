import React, { useState } from "react";
import axios from 'axios';

function Create() {
  const [task, setTask] = useState('');

  const handleAdd = async () => {
    if (!task.trim()) {
      alert("Task cannot be empty");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/add", { task });
      if (res.status === 200) {
        location.reload()
      } else {
        alert("Some error occurred");
      }
    } catch (e) {
      console.log(e);
      alert("Some error occurred");
    }
  }

  return (
    <div className="create-form">
      <input 
        type="text" 
        placeholder='Enter Task' 
        value={task}
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
