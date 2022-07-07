import { useState } from 'react'
import './App.css'

export default function App() {
  const [todo, setTodo] = useState([])
  const [post, setPost] = useState({ text: '', status: false, Date: {} })
  const [currentPage, setCurrentPage] = useState(1)
  const [todoNo] = useState(3)
  console.log(todo)
  function addTodo(e) {
    e.preventDefault()
    const newTodo = [{ text: post, status: false, Date: new Date() }, ...todo]
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
  const indexOfLastPost = currentPage * todoNo
  const indexOfFirstPost = indexOfLastPost - todoNo
  const currentTodos = todo.slice(indexOfFirstPost, indexOfLastPost)

  function getTime(postDate) {
    const currentDate = new Date()
    var time = Math.round((currentDate.getTime() - postDate.getTime()) / 1000)
    var hour = 60 * 60
    var days = 60 * 60 * 24
    var month = 60 * 60 * 24 * 31
    var year = 60 * 60 * 24 * 31 * 12
    if (time < 60) {
      return time + 's'
    } else if (time > 60) {
      if (time / hour > 0.99) {
        if (time / days > 0.99) {
          if (time / month > 0.99) {
            if (time / year > 0.99) {
              return Math.round(time / year > 0.99) + 'y'
            }
            return Math.round(time / month) + 'mon'
          }
          return Math.round(time / days) + 'd'
        }
        return Math.round(time / hour) + 'h'
      }
      return Math.round(time / 60) + 'm'
    }
    return time
  }

  return (
    <div className='App'>
      <div className='input-box'>
        <input
          className='input'
          onChange={(e) => setPost(e.target.value)}
          value={post.text}
          placeholder='Add your task here'
        />
        <button onClick={post.text === '' ? '' : (e) => addTodo(e)}>Add</button>
      </div>
      {currentTodos &&
        currentTodos.map((tod, i) => {
          return (
            <div className={`card `} key={i}>
              <div className='textarea'>
                <div
                  className={`text-box-trp ${
                    tod.status ? 'text-box-trp-cmp' : ''
                  }`}
                >
                  <p>{tod.text}</p>
                </div>
              </div>
              <div className={`dashboard ${tod.status ? 'compcard' : ''}`}>
                <button className='btn-del' onClick={() => deleteTodo(i)}>
                  Delete
                </button>
                <button className='btn-com' onClick={() => changeStatus(i)}>
                  {tod.status ? 'Completed' : 'Incomplete'}
                </button>
                <p>
                  {getTime(tod.Date)}
                  <span className='ago'> ago</span>
                </p>
              </div>
            </div>
          )
        })}
      <div className='pagntn-container'>
        {totalPages.map((page) => {
          return (
            <a onClick={() => setCurrentPage(page)} className='pagntn'>
              {page}
            </a>
          )
        })}
      </div>
    </div>
  )
}
