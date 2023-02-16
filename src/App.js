import React, {useState, useEffect, useMemo} from 'react'
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
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  let currentList


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

// Remove ALL //
const removeALL = () => {
  setTodoList([])
}


// Complete task //
const completeTask = (e) => {
  // eslint-disable-next-line eqeqeq
  let isCompleted = todoList.findIndex(item => item.id == e.target.value)
  todoList[isCompleted].completed = !todoList[isCompleted].completed
  setTodoList([...todoList])
}


// Search task //
const searchTask = (e) => {
  setSearch(e)
  e === "" ? setSearching(false) : setSearching(true)
}

const filteredTodoList = useMemo(() => {
  return todoList.filter((task) => {
      return (
          task.value
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      )
  })
}, [search, todoList]);

searching === false ? currentList = todoList : currentList = filteredTodoList


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
        {currentList.map((task, index) =>
          <div key={index}>
            <h3>{language.taskID}: {currentList[index].id}</h3> 
            <button value={currentList[index].id} onClick={removeTask}>❌</button> 
            <button value={currentList[index].id} onClick={completeTask}>{language.completedTask}: {currentList[index].completed === true ? "✔️" : "⭕"}</button>
            <p>{currentList[index].value}</p>
          </div>
        )}  
        <input type="text" id="searchInput" placeholder={language.search} onChange={e => searchTask(e.target.value)}></input>
        <button onClick={removeALL}>{language.removeAll}</button>
      </div>
    </>
  )
}




