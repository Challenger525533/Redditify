import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Default.css';
import { myName } from "./App.js";

//SpotifyPlaylists.js: Returns the user's Spotify playlists

function SpotifyPlaylists() {
    //using useState to declare and assign setPosts
    //represents the posts received from the backend
    var [playlists, setPlaylists] = useState('');
    var [loading, setLoading] = useState(true);
    var [errorMessage, setErrorMessage] = useState('');

    //fetching the user's playlists from the backend
    useEffect(() => {
        fetch('http://localhost:5000/getPlaylists', { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data['error']) { //In case an error was identified - i.e. access token not stored yet
                setErrorMessage(data['error']);
                console.log(data['error'])
            }
            setPlaylists(data['playlistNames']); //set playlist names accordingly
            console.log("Got data")
            setLoading(false);
            })
        .catch(error => {
            //something went wrong
            console.log(error)
            setPlaylists(error)
            setLoading(false);
            })
    }, []);
    return(
        <div className="Default">
            {/*Basic titles and then a preformatted list should appear unless it errors*/}
            <h1>Your Spotify Playlists</h1>
            <h2>Here are some of your most recent playlists:</h2>
            {/*If there is an error, display it. Otherwise, display the posts*/}
            {(errorMessage !== '') ? <p>Error: {errorMessage}. Please try logging in again.</p>
             : <div className='PostNames'> 
                {loading ? 'Loading...' : <div dangerouslySetInnerHTML={{__html: playlists}} /> }
               </div>
            }
            {/*Button to return to home page*/}
            <div className="Default-buttons">
            <Link to="/">
                <button classname='Default-buttons' type="button">
                    Return to Home
                </button>
            </Link>
            </div>
        </div>
    );
}

export default SpotifyPlaylists;