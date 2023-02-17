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

  // Main
  const [todoList, setTodoList] = useState([])
  // Add
    const [inputValue, setInputValue] = useState("")
    const [newTask, setNewTask] = useState()
  // Update
    const [editing, setEditing] = useState(false)
    const [currentListID, setCurrentListID] = useState("")
    const [updateValue, setUpdateValue] = useState("")
  // Search
    const [searching, setSearching] = useState(false)
    const [search, setSearch] = useState("") 
  // Render
    let currentList


// Add new task //
useEffect(() => {
  if (newTask !== undefined) {
    todoList.push(newTask)
    setNewTask(undefined)
    setSearching(false)
  }
  setEditing(false)
}, [newTask, todoList])

  // Check submit and update list //
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


// Edit task //
const editTask = (e) => {
  setEditing(true)
  // eslint-disable-next-line eqeqeq
  setUpdateValue(todoList[todoList.findIndex(item => item.id == e.target.value)].value)
  setCurrentListID(e.target.value)
}

  // Check update and update list //
  const checkUpdate = (e) => {
    if (e.key === 'Enter') {
      // eslint-disable-next-line eqeqeq
      todoList[todoList.findIndex(item => item.id == e.target.id)].value = updateValue
      setTodoList([...todoList])
      setEditing(false)
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
  setEditing(false)
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
    <div className='todoApp'>
      <h1>{language.title}</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          setInputValue('')
        }}
      >
        <div>
          <input
            className='newTask'
            type='text'
            value={inputValue}
            placeholder={language.newTaskInput}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={checkSubmit}
          />
        </div>
      </form>

      <div className='menu'>
        <input className='search' type="text" id="searchInput" placeholder={language.search} onChange={e => searchTask(e.target.value)}></input>
        <button className='deleteAll' onClick={removeALL}>{language.removeAll}</button>
      </div>

      {editing === true ? 
          <form
            onSubmit={e => {
              e.preventDefault()
              setUpdateValue('')
            }}
          >
            <div className='editTask'>
              <label className='editLabel'>{language.editing}:</label>
              <input 
                className='editValue'
                type="text" 
                value={updateValue}  
                id={currentListID}
                onChange={e => setUpdateValue(e.target.value)}
                onKeyDown={checkUpdate}
              />
              </div>
          </form>
        : ""}

      <div className='list'>
        {currentList.map((task, index) =>
          <div className='task' key={index}>
            <div className='taskMenuWrapper'>
              <h3>{language.taskID}: {index +1}</h3> 
              <div className='taskMenu'>
                <button className='completed' value={currentList[index].id} onClick={completeTask}>{language.completedTask}: {currentList[index].completed === true ? "✔️" : "⭕"}</button>
                <button className='edit' value={currentList[index].id} onClick={editTask}>📝</button>
                <button className='delete' value={currentList[index].id} onClick={removeTask}>❌</button> 
              </div>
            </div>

            <p className='taskValue' >{currentList[index].value}</p>
          </div>
        )}  
      </div>
    </div>
  )
}




