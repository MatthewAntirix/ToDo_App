import React, {useState, useEffect} from 'react'
import {cz} from "./language_cz"
import {en} from "./language_en"
import "./basic.css"


// Language module //

let language
let languageSwitch = "en"
    if (languageSwitch === "cz") {
        language = cz
    } else {
        language = en
    }

    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Main function ///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ToDoApp = () => {
  const [inputValue, setInputValue] = useState("")
  const [newTask, setNewTask] = useState()
  const [todoList, setTodoList] = useState([])


// Add new task //
useEffect(() => {
  if (newTask !== undefined) {
    todoList.push(newTask)
  }
}, [newTask])


// Check submit //
const checkSubmit = (e) => {
  if (e.key === 'Enter') {
    setNewTask(e.target.value)
  }
}


  return (
    <>
      <h1>{language.title}</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          setInputValue('')
        }}
      >
        <div>
          <input
            type='text'
            placeholder={language.newTaskInput}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={checkSubmit}
          />
        </div>
      </form>

      <div>
        {todoList.map((task, index) =>
          <div key={index}>
            <h3>{language.taskID}: {index +1}</h3> 
            <p>{task}</p>
          </div>
        )}
      </div>
    </>
  )
}




