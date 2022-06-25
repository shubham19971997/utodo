import { useState } from 'react'
import './App.css'

export default function App() {
  
  const [todo, setTodo] = useState([])
  const [post, setPost] = useState({ text: '', status: false })
  const [currentPage,setCurrentPage] = useState(1)
  const [todoNo] = useState(5)

  function addTodo() {
    const newTodo = [{ text: post, status: false }, ...todo]
    setTodo(newTodo)
    setPost({ text: '' })
  }
  function deleteTodo(i) {
    const newTodo = [...todo]
    newTodo.splice(i, 1)
    setTodo(newTodo)
  }
  function changeStatus(i) {
    const newTodo = [...todo]
    newTodo[i].status = true
    setTodo(newTodo)
  }

  const totalTodos = todo.length
  const totalPages = []
  for (let i = 1; i <= Math.ceil(totalTodos / todoNo); i++) {
    totalPages.push(i)
  }
  //Get current posts
  const indexOfLastPost = currentPage*todoNo;
  const indexOfFirstPost = indexOfLastPost - todoNo;
  const currentTodos = todo.slice(indexOfFirstPost,indexOfLastPost)

  return (
    <div className='App'>
      <div>
        <input
          onChange={(e) => setPost(e.target.value)}
          value={post.text}
          placeholder='add your task here'
        />
        <button onClick={() => addTodo()}>Add</button>
      </div>
      {currentTodos &&
        currentTodos.map((tod, i) => {
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
      <div className='pagntn-container'>
        {totalPages.map((page) => {
          return <a onClick={() =>setCurrentPage(page)}className='pagntn'>{page}</a>
        })}
      </div>  
    </div>
  )
}
