import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { mySub, myDepth } from "./Subreddit.js";

//SubredditTest.js: Displays the hottest posts from a given subreddit

function SubredditTest() {
    //using useState to declare and assign setPosts
    //represents the posts received from the backend
    var [posts, setPosts] = useState(''); 
    var [loading, setLoading] = useState(true); 

    //fetching the posts from the backend
    useEffect(() => {
        fetch('http://localhost:5000/subredditPosts', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'subreddit': mySub, 'depth': myDepth})})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setPosts(data['postNames']);
            setLoading(false);
            console.log("Got data")
            })
        .catch(error => {
            console.log(error)
            setLoading(false);
            setPosts(error)
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic titles and then a preformatted list should appear*/}
            <h1>Welcome to r/{mySub}!</h1>
            <h2>Here are some of the hottest posts:</h2>
            <div className='PostNames'>
                {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: posts}} /> }
            </div>
            {/*Button to return to home page*/}
            <div className="App-buttons">
            <Link to="/createSubredditPlaylist">
                <button type="button">
                    Generate Spotify Playlist
                </button>
            </Link>
            <Link to="/subredditSearch">
                <button type="button">
                    Return to Home
                </button>
            </Link>
            </div>
        </div>
    );
}

export default SubredditTest;