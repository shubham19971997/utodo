import { useState, useRef } from 'react'
import './App.css'

export default function App() {

  const [todo, setTodo] = useState([])
  const [post, setPost] = useState({ text: '', status: false })
  function addTodo() {
    const newTodo = [{ text: post, status: false }, ...todo]
    setTodo(newTodo)
    setPost({text: ""})
  }
  function deleteTodo(i) {
    const newTodo = [...todo]
    newTodo.splice(i, 1)
    setTodo(newTodo)
  }
  function changeStatus(i) {
    const newTodo = [...todo]
    newTodo[i].status = !newTodo[i].status
    setTodo(newTodo)
  }
  return (
    <div className='App'>
      <input
        onChange={(e) => setPost(e.target.value)}
        value={post.text}
        placeholder='add your task here'
      />
      <button onClick={() => addTodo()}>Add</button>
      {todo &&
        todo.map((tod, i) => {
          return (
            <div className={`card ${tod.status ? 'compcard' : ''}`} key={i}>
              <div className='textarea'>
                <p>{tod.text}</p>
              </div>
              <button onClick={() => deleteTodo(i)}>Delete</button>
              <button onClick={() => changeStatus(i)}>
                {tod.status ? 'Completed' : 'Incomplete'}
              </button>
            </div>
          )
        })}
    </div>
  )
}
