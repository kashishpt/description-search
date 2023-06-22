import React from 'react'
import '../stylesheets/Video.scss'

function Video(props) {
    const data = props.props
    const query = props.query


    const description = data['snippet']['description']
    const descriptionPadding = 30
    const queryStart = description.toLowerCase().indexOf(query.toLowerCase())
    const queryEnd = queryStart + query.length

    const descriptionStart = Math.max(queryStart - descriptionPadding, 0)
    const descriptionEnd = Math.min(queryEnd + descriptionPadding, description.length)

    const descriptionJSX =
        (<div>
            ...{description.substring(descriptionStart, queryStart)}
            <span className='query-in-description'>{description.substring(queryStart, queryEnd)}</span>
            {description.substring(queryEnd, descriptionEnd)}...
        </div>)

    return (
        <div className='video-container'>
            <div className='video-link'>
                <a href={`https://www.youtube.com/watch/${data['contentDetails']['videoId']}`} target='_blank' rel="noreferrer noopener">&#128279;</a>
            </div>
            <div className='thumbnail-container'>
                <img src={data['snippet']['thumbnails']['default']['url']} alt='Video Thumbnail'></img>
            </div>
            <div className='text-info'>
                <div className='video-title'>{data['snippet']['title']}</div>
                <div className='channel-name'>{data['snippet']['channelTitle']}</div>
                <div className='video-description'><br></br>{descriptionJSX}</div>
            </div>

            
        </div>
    )
}

export default Video