from flask import Flask, abort
import script as api

app = Flask(__name__, static_folder='../client/build', static_url_path='/')

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/channel/<channelid>")
def channel(channelid: str):
    try:
        info =  api.get_channel_info(channelid)
        if 'error' in info:
            abort(404)
        return info
    except BaseException:
        abort(404)
    

@app.route("/videos/<playlistid>/<pagetoken>")
def channel_info(playlistid: str, pagetoken: str):
    x = api.get_videos(playlist_id=playlistid, page_token=pagetoken)
    return x


if __name__ == '__main__':
    app.run(debug=True)
