import React from 'react'
import './App.css'

function Pagntn({totalPages,setCurrentPage}) {
  return (
    <div className='pagntn-container'>
        {totalPages && totalPages.map((page) => {
          return (
            <a onClick={() => setCurrentPage(page)} className='pagntn'>
              {page}
            </a>
          )
        })}
      </div>
  )
}

export default Pagntn