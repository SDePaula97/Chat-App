import ReactPlayer from 'react-player'

const Video = () => {
    return (
        <div className="video-container">
            <ReactPlayer
                url={"https://www.youtube.com/watch?v=M-Bflg9787w"}
                muted={true}
                controls={true}
                playing={true}
                width={'100%'}
                height={'100%'}
            />
        </div>
       
    )
}
export default Video;
