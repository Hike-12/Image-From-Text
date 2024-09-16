import { useState } from 'react'
import './App.css'
import FileUpload from './components/File_upload/File_Upload'
import Help from '/src/components/Help/Help.jsx';

function App() {
  return (
  <>
    <div className='itt'>
      <div className="help">
        <Help />
      </div>
      <div className='title'>
        <h1>Text From Image</h1>
      </div>
      <FileUpload />
    </div>
  </>
  )
}

export default App
