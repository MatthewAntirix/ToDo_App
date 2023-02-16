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
    setNewTask(undefined)
  }
}, [newTask, todoList])


// Check submit and update list//
const checkSubmit = (e) => {
  if (e.key === 'Enter') {
    let tasksList = {
      id: new Date().getTime(),
      value: e.target.value,
      completed: false,
    }
    setNewTask(tasksList)
  }
}


// Remove task //
const removeTask = (e) => {
  // eslint-disable-next-line eqeqeq
  setTodoList(todoList.filter(newList => {return newList.id != e.target.value}))
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
            value={inputValue}
            placeholder={language.newTaskInput}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={checkSubmit}
          />
        </div>
      </form>

      <div>
        {todoList.map((task, index) =>
          <div key={index}>
            <h3>{language.taskID}: {todoList[index].id}</h3> 
            <button value={todoList[index].id} onClick={removeTask}>❌</button> 
            <button>completed: {todoList.completed ? "✔️" : "false"}</button>
            <p>{todoList[index].value}</p>
          </div>
        )}
      </div>
    </>
  )
}




