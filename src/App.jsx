import { useState } from 'react'
import './App.css'
import FileUpload from './components/File_upload/File_Upload'
import Help from '/src/components/Help/Help.jsx';

function App() {
  const [helpStatus, setHelpStatus] = useState(false)
  function toggleHelp(){
    setHelpStatus(helpStatus => !helpStatus)
  }
  return (
  <>
    <div className='itt'>
      <div className='title'>
        <h1>Text From Image</h1>
      </div>
      <div className="help">
        <button onClick={toggleHelp}>{!helpStatus?"Help":"Close"}</button>
        {helpStatus && <Help />}
      </div>
      <FileUpload />
    </div>
  </>
  )
}

export default App
