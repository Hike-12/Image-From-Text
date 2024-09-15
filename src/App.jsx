import { useState } from 'react'
import './App.css'
import FileUpload from './components/File_upload/File_Upload'

function App() {

  return (
    <div className='itt'>
      <div className='title'>
        <h1>Text To Image</h1>
      </div>
      <FileUpload />
    </div>
  )
}

export default App
