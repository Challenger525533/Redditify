import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

//LoginStatus.js: Returns the user's local login status
//NOTE: THIS FILE IS NOT USED IN THE FINAL PRODUCT (but im keeping it in case it in fact is)

function LoginStatus() {
  //reinitializing username in case we end up back here.
  //username = ''
  var [username, setUsername] = useState('');
  var [password, setPassword] = useState('');
  var [redditName, setRedditName] = useState('');
  var [defaultReddit, setDefaultReddit] = useState(false);
  var [status, setStatus] = useState('')

  //fetching the loginstatus message from the backend
  useEffect(() => {
    fetch('http://localhost:5000/applogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStatus(data['msg']);
      })
      .catch(error => {
        console.log(error)
      })
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {status}
        </p>
        {/*buttons to navigate to other pages */}
        <Link to="/">
          <button onClick={e => {
          }} className='App-buttons'>Go Home</button>
        </Link>
      </header>
    </div>
  );
}

export default LoginStatus;
