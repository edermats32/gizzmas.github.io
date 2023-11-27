import { studioAlbums, liveAlbums, compilations, eps, remixAlbums } from './albumData.js';

export function getSelectedAlbums() {
    const seedInputValue = document.querySelector("#seedInput").value

    const includeLive = seedInputValue.includes("/L");
    const includeCompilations = seedInputValue.includes("/C");
    const includeEps = seedInputValue.includes("/E");
    const includeRemix = seedInputValue.includes("/R");

    const includedAlbums = studioAlbums.concat(
        includeLive ? liveAlbums : [],
        includeCompilations ? compilations : [],
        includeEps ? eps : [],
        includeRemix ? remixAlbums : []
    );

    return includedAlbums;
}