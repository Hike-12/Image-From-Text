import { useState } from 'react';
import './App.css';
import FileUpload from './components/File_upload/File_Upload';
import Help from './components/Help/Help.jsx'; // Adjusted path to match typical usage

function App() {
  return (
    <div className="app-container">
      <div className="file-scroller">
        <div className="itt">
          <div className="help">
            <Help />
          </div>
          <div className="title">
            <h1>Text From Image</h1>
          </div>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}

export default App;

