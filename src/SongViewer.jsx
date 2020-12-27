import React, { useEffect, useState } from "react";
import Abcjs from "react-abcjs";

import { songs as songList } from "./songs";

export function SongViewer() {
  const [songs, setSongs] = useState(songList);
  const [selectedSong, setSelectedSong] = useState(songList[0].title);
  const [renderParams, setRenderParams] = useState({
    viewportHorizontal: true,
    visualTranspose: 0,
  });
  const parserParams = {};
  const [engraverParams, setEngraverParams] = useState({
    responsive: "resize",
  });

  const song = songs.find((x) => x.title === selectedSong);

  const handleSongChange = (e) => {
    setSelectedSong(e.target.value);
  };

  const handleTransposeChange = (e) => {
    setRenderParams(() => ({ visualTranspose: e.target.value }));
  };

  const handleResponsiveChange = (e) => {
    setEngraverParams(() => ({
      responsive: e.target.checked ? "resize" : null,
    }));
  };

  function handleNotationChange(e) {
    e.preventDefault();
    const songsCopy = [...songs];
    const newSong = {
      ...song,
      notation: e.target.value,
    };
    const songIndex = songsCopy.findIndex((x) => x.title === song.title);
    songsCopy.splice(songIndex, 1, newSong);
    setSongs(songsCopy);
  }

  return (
    <div>
      <label>
        Song:
        <select onChange={handleSongChange}>
          {songs.map((x) => (
            <option key={x.title} value={x.title}>
              {x.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Responsive:
        <input
          type="checkbox"
          onChange={handleResponsiveChange}
          checked={!!engraverParams.responsive}
        />
      </label>
      <label>
        Transpose:
        <input
          placeholder="Number of half steps"
          onChange={handleTransposeChange}
          value={renderParams.visualTranspose}
        />
      </label>
      <div>
        <textarea value={song.notation} onChange={handleNotationChange} />
      </div>
      <Abcjs
        abcNotation={song.notation}
        parserParams={parserParams}
        engraverParams={engraverParams}
        renderParams={renderParams}
      />
    </div>
  );
}
