import os

import googleapiclient.discovery
import os

# Disable OAuthlib's HTTPS verification when running locally.
# *DO NOT* leave this option enabled in production.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

api_service_name = "youtube"
api_version = "v3"
DEVELOPER_KEY = os.environ['YOUTUBE_KEY']
youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey = DEVELOPER_KEY)

def get_channel_info(channel_id: str):

    if channel_id == None:
        return {"error": 404, "reason": f"{channel_id} not found"}
    request = youtube.channels().list(
        part="contentDetails",
        id=channel_id
    )

    return request.execute()['items'][0]

# takes in a playlist_id, spits out a list of contentDetails for videos in that playlist
# https://developers.google.com/youtube/v3/docs/playlistItems#resource
def get_videos(playlist_id: str, max_results: int=50, page_token: str=""):
    request = None
    print('here')
    if page_token != "_":
        request = youtube.playlistItems().list(
            part="contentDetails,snippet",
            maxResults=max_results,
            playlistId=playlist_id,
            pageToken=page_token
        )
    else:
        request = youtube.playlistItems().list(
            part="contentDetails,snippet",
            maxResults=max_results,
            playlistId=playlist_id
        )
    return request.execute()

# takes in a youtube channel name, spits out a list of playlistItems of their videos
def username_to_videos(username: str):
    channel_info = get_channel_info(username=username)
    videos = get_videos(channel_info['contentDetails']['relatedPlaylists']['uploads'])

    return videos




    