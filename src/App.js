import { useState, useRef } from 'react'
import './App.css'
import { FiEdit3 } from 'react-icons/fi'
import Pagntn from './pagntn'

export default function App() {
  const [todo, setTodo] = useState([])
  const [post, setPost] = useState({ text: '', status: false, Date: {} })
  const [currentPage, setCurrentPage] = useState(1)
  const [todoNo] = useState(3)
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
    console.log('todo no:- ' + i)
    console.log('current page:- ' + currentPage)
    console.log(totalPages.slice(-1))
    console.log(todo)
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
  const pageSetter = (page) => {
    setCurrentPage(page)
  }
  const handleKeyDown = (e) => {
    console.log('hello from outside function')
    if (e.keyCode === 13 && e.target.value) {
      addTodo(e)
    }
  }
  return (
    <div className='App'>
      <form
        className='input-box'
        onSubmit={post.text === '' ? '' : (e) => addTodo(e)}
      >
        <input
          className='input'
          onChange={(e) => setPost(e.target.value)}
          value={post.text}
          placeholder='Add your task here'
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button type='submit' value='Submit'>
          Add
        </button>
      </form>
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
                  <FiEdit3
                    size={12}
                    color='rgb(45, 40, 40)'
                    style={{
                      position: 'absolute',
                      right: '7px',
                      bottom: '3px',
                      color: 'black',
                    }}
                  />
                </div>
              </div>
              <div className={`dashboard ${tod.status ? 'compcard' : ''}`}>
                <button
                  className='btn-del'
                  onClick={() => deleteTodo(3 * (currentPage - 1) + i)}
                >
                  Delete
                </button>
                <button
                  className='btn-com'
                  onClick={() => changeStatus(3 * (currentPage - 1) + i)}
                >
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
      <Pagntn totalPages={totalPages} setCurrentPage={pageSetter} />
    </div>
  )
}
