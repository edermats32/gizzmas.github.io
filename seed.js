const seedLength = 16;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export let gizzSeed = '';

for (let i = 0; i < seedLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    gizzSeed += characters.charAt(randomIndex);
}

const seedInput = document.querySelector("#seedInput")
seedInput.value = gizzSeed

const addSeedSwitchEvent = (id, param) => {
    const element = document.querySelector(id);
    const seedInput = document.querySelector("#seedInput");

    element.addEventListener("click", () => {
        element.checked
            ? seedInput.value += param
            : seedInput.value = seedInput.value.replace(param, "");
    });
};


addSeedSwitchEvent("#includeLive", "/L")
addSeedSwitchEvent("#includeCompilations", "/C")
addSeedSwitchEvent("#includeEps", "/E")
addSeedSwitchEvent("#includeRemix", "/R")

/*
const isOptionChecked = (id) => document.querySelector(id).checked;
if (isOptionChecked("#includeLive")) gizzSeed += "/L"
if (isOptionChecked("#includeCompilations")) gizzSeed += "/C"
if (isOptionChecked("#includeEps")) gizzSeed += "/E"
if (isOptionChecked("#includeRemix")) gizzSeed += "/R"
*/