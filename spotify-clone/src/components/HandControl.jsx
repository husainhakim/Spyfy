import React, { useEffect, useRef, useState } from "react";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { PlayerContext } from "@context/PlayerContext";
import { useContext } from "react";

const HandControl = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const { play, pause, next, previous, playStatus } =
        useContext(PlayerContext);

    useEffect(() => {
        const loadModel = async () => {
            const net = await handpose.load();
            setModel(net);
        };

        loadModel();
    }, []);

    useEffect(() => {
        if (model) {
            const detectHands = async () => {
                if (videoRef.current && videoRef.current.readyState === 4) {
                    const video = videoRef.current;
                    const handEstimates = await model.estimateHands(video);

                    if (handEstimates.length > 0) {
                        const hand = handEstimates[0];
                        const { landmarks } = hand;
                        // Implement your gesture detection logic here.
                        // Example: Detect a thumbs up for play/pause toggle.
                        const thumbTip = landmarks[4];
                        const indexTip = landmarks[8];

                        // Simple gesture detection logic
                        if (thumbTip[1] < indexTip[1]) {
                            if (!playStatus) play();
                        } else {
                            if (playStatus) pause();
                        }
                    }
                }

                requestAnimationFrame(detectHands);
            };

            detectHands();
        }
    }, [model, play, pause, playStatus]);

    return (
        <div>
            <video
                ref={videoRef}
                style={{ display: "none" }}
                autoPlay
                playsInline
                muted
                width="640"
                height="480"
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
    );
};

export default HandControl;
