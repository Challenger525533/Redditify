import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

//ButtonTest.js: Webpage to display the user's posts

function ButtonTest() {
    //using useState to declare and assign setPosts
    //represents the posts received from the backend
    var [posts, setPosts] = useState('');
    var [loading, setLoading] = useState(true); 

    //fetching the posts from the backend
    useEffect(() => {
        fetch('http://localhost:5000/userPosts', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': myName})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPosts(data['postNames']);
            console.log("Got data")
            setLoading(false);
            })
        .catch(error => {
            console.log(error)
            setPosts(error)
            setLoading(false);
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic titles and then a preformatted list should appear*/}
            <h1>Welcome to Redditify, u/{myName}!</h1>
            <h2>Here are some of your most recent posts:</h2>
            {console.log(posts)}
            <div className='PostNames'> 
                {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: posts}} /> }
            </div>
            {/*Button to return to home page*/}
            <Link to="/">
                <button type="button">
                    Return to Home
                </button>
            </Link>
            <Link to="/playlistTest">
                <button type="button">
                    PLAYLIST TEST
                </button>
            </Link>
        </div>
    );
}

export default ButtonTest;