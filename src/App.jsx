import React, { useState } from "react";
import Abcjs from "react-abcjs";

import { songs } from "./songs";

export function App() {
  const [song, setSong] = useState(songs[0]);
  const [renderParams, setRenderParams] = useState({
    viewportHorizontal: true,
    visualTranspose: 0,
  });
  const parserParams = {};
  const [engraverParams, setEngraverParams] = useState({
    responsive: "resize",
  });

  const handleSongChange = (e) => {
    const title = e.target.value;
    setSong(songs.find((x) => x.title === title));
  };

  const handleTransposeChange = (e) => {
    setRenderParams(() => ({ visualTranspose: e.target.value }));
  };

  const handleResponsiveChange = (e) => {
    setEngraverParams(() => ({
      responsive: e.target.checked ? "resize" : null,
    }));
  };

  return (
    <div>
      <label>
        Responsive:
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
      <Abcjs
        abcNotation={song.notation}
        parserParams={parserParams}
        engraverParams={engraverParams}
        renderParams={renderParams}
      />
    </div>
  );
}
