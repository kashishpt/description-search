import React, { useState, useEffect } from 'react'
import Video from './Video'
import '../stylesheets/Page.scss'

function Page() {
    const [channel, updateChannel] = useState(undefined) // Object providing information about the current channel, undefined if no current valid channel exists
    const [videos, updateVideos] = useState([]) // Array of Objects returned by the Youtube API
    const [nextPageToken, updateNextPageToken] = useState("_") // token for the next page of results from the Youtube API
    const [prevPageToken, updatePrevPageToken] = useState("_") // token for the next page of results from the Youtube API
    const [description, updateDescription] = useState("") // query description

    
    function searchChannel(channelID) {
        updateChannel(undefined)
        updateDescription("")
        fetch(`/channel/${channelID}`)
            .then(res => {
                if (res?.ok) {
                    return res.json()
                } else {
                    return {"error": "Not a 2XX response from channel API", "response": res}
                }
            })
            .then(data => {
                if ("error" in data) {
                    alert(`Invalid link.`)
                } else {
                    updateVideos([])
                    updateChannel(data)
                    updateNextPageToken("_")
                    updatePrevPageToken("_")
                }

                
            })
    }

    // ASSUMES VALUE OF `channel` IS VALID
    // Searches videos made by `channel` for matching descriptions
    function searchDescription(description, nextPage=true) {
        updateDescription(description)
        fetch(`/videos/${channel['contentDetails']['relatedPlaylists']['uploads']}/${nextPage ? nextPageToken : prevPageToken}`)
            .then(res => res.json())
            .then(data => {
                newVideosDropped(data)
            })
    }

    function newVideosDropped(data) {
        let nextPage = ""
        let prevPage = ""
        if ("nextPageToken" in data) {
            updateNextPageToken(data["nextPageToken"])
        } else {
            updateNextPageToken('_')
        }

        if ("prevPageToken" in data) {
            updatePrevPageToken(data['prevPageToken'])
        } else {
            updatePrevPageToken('_')
        }

        let newVideos = data["items"].map(e => e)
        updateVideos(newVideos)
    }

    


    return (
        <div className='page-container'>

            <div id='search-box-container'>
                <input type='text' id='channel-id-input' placeholder="Channel ID (Go to the channel's About Page, click Share, then Copy Channel ID)"></input>
                <button type='' onClick={() => searchChannel(document.getElementById('channel-id-input').value)}>&#x2713;</button> 
                
                <br></br>

                <input type='text' id='description-input' disabled={channel === undefined} placeholder='Search query'></input>
                <button type='' onClick={() => searchDescription(document.getElementById('description-input').value)} disabled={channel === undefined}>&#x2713;</button>
            </div>
            
            <div>
                {description !== "" && 
                    <>
                    <div className='navigation-container'>
                        <button disabled={prevPageToken === '_'} onClick={() => searchDescription(document.getElementById('description-input').value, false)}>&#x3c;</button>
                        <button disabled={nextPageToken === '_'} onClick={() => searchDescription(document.getElementById('description-input').value)}>&#x3e;</button>
                    </div>

                    {videos.filter(video => video["snippet"]["description"].toLowerCase().includes(description.toLowerCase())).map(video => <Video props={video} query={description}></Video>)}
                    </>
                    
                }
            </div>
            

        </div>
    )
}

export default Page