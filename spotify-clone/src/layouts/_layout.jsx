import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Sidebar from "./Sidebar";
import Player from "@components/Player";

const _layout = ({ children }) => {
    const { audioRef, track, songsData } = useContext(PlayerContext);

    return (
        <div className="h-screen bg-black">
            {songsData.length !== 0 ? (
                <>
                    <div className="h-[90%] flex">
                        <Sidebar />
                        {children}
                    </div>
                    <Player />
                </>
            ) : null}

            <audio
                ref={audioRef}
                src={track ? track.file : ""}
                preload="auto"
            ></audio>
        </div>
    );
};

export default _layout;
