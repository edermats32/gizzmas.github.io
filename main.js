import { gizzSeed } from './seed.js';
import { createCalendar } from './calendar.js';
import { getSelectedAlbums } from './albumLogic.js';

document.querySelector("#enterSeedBtn").addEventListener('click', () => {
    const seedInputValue = document.querySelector("#seedInput").value
    let seed = seedInputValue == "" ? gizzSeed : seedInputValue
    console.log(`Seed: ${seed}`)
    createCalendar(seed, getSelectedAlbums())

    const fixCheckboxState = (id, param) => {
        const element = document.querySelector(id)
        element.checked = seedInputValue.includes(param) ? true : false;
    }

    fixCheckboxState("#includeLive", "/L")
    fixCheckboxState("#includeCompilations", "/C")
    fixCheckboxState("#includeEps", "/E")
    fixCheckboxState("#includeRemix", "/R")
})

createCalendar(gizzSeed, getSelectedAlbums())