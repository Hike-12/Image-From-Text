import React, { useState, useEffect } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const formatResponse = (data, wordsPerLine = 10) => {
    const text = data
      .map(item => item.text)
      .join(' ')
      .replace(/(\s\s+)/g, ' ')
      .trim();
  
    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
  
    return lines.join('\n');
  };
  

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.api-ninjas.com/v1/imagetotext', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Api-Key': 'dzBejYXVkVKxPhYOE/KBOg==oT1uKtJsN8rpxbJV'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}. Message: ${errorText}`);
        }

        const result = await response.json();
        setResponse(formatResponse(result));
        setError('');
      } catch (error) {
        setResponse('');
        setError(`Error: ${error.message}`);
      } finally {
        setUploading(false);
      }
    };

    uploadFile();
  }, [file]);

  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <button
        id="uploadButton"
        onClick={() => file && setFile(file)}
        disabled={uploading}
      >
        Upload
      </button>
      <pre id="response">{error ? error : response}</pre>
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
