"use client";
import { useState, useEffect, useRef } from "react";
import style from "./VideoPlayer.module.scss";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const videoPlayer = (props) => {
	const videoElement = useRef(null);
	const [playerState, setPlayerState] = useState({
		isPlaying: false,
		progress: 0,
		speed: 1,
		isMuted: false,
	});

	useEffect(() => {
		console.log(playerState);
	}, [playerState]);

	const togglePlay = () => {
		setPlayerState({
			...playerState,
			isPlaying: !playerState.isPlaying,
		});
	};

	useEffect(() => {
		playerState.isPlaying
			? videoElement.current.play()
			: videoElement.current.pause();
	}, [playerState.isPlaying, videoElement]);

	const handleOnTimeUpdate = () => {
		const progress =
			(videoElement.current.currentTime / videoElement.current.duration) * 100;
		setPlayerState({
			...playerState,
			progress,
		});
	};

	const handleVideoProgress = (event) => {
		const manualChange = Number(event.target.value);
		videoElement.current.currentTime =
			(videoElement.current.duration / 100) * manualChange;
		setPlayerState({
			...playerState,
			progress: manualChange,
		});
	};

	const handleVideoSpeed = (event) => {
		const speed = Number(event.target.value);
		videoElement.current.playbackRate = speed;
		setPlayerState({
			...playerState,
			speed,
		});
	};

	const toggleMute = () => {
		setPlayerState({
			...playerState,
			isMuted: !playerState.isMuted,
		});
	};

	useEffect(() => {
		playerState.isMuted
			? (videoElement.current.muted = true)
			: (videoElement.current.muted = false);
	}, [playerState.isMuted, videoElement]);

	return (
		<div className={style.videoContainer}>
			<video
				ref={videoElement}
				type="video/mp4"
				src={props.url}
				width="100%"
				height="auto"
				onTimeUpdate={handleOnTimeUpdate}
			></video>

			<div className={style.controls}>
				<div className={style.iconButton}>
					<button onClick={togglePlay}>
						{!playerState.isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
					</button>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					value={playerState.progress}
					onChange={(e) => handleVideoProgress(e)}
				/>
				<select value={playerState.speed} onChange={(e) => handleVideoSpeed(e)}>
					<option value="0.50">0.50x</option>
					<option value="1">1x</option>
					<option value="1.25">1.25x</option>
					<option value="2">2x</option>
				</select>
				<div className={style.iconButton}>
					<button onClick={toggleMute}>
						{!playerState.isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default videoPlayer;
