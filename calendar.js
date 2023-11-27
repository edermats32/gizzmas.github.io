export function createCalendar(gizzSeed, albumListArr) {
    document.querySelector("#calendar").innerHTML = ""
    document.querySelector("#todayDoor").innerHTML = ""

    // Shuffle the albumsArray using Fisher-Yates algorithm with the provided seed
    const rngizz = new Math.seedrandom(gizzSeed);
    for (let i = albumListArr.length - 1; i > 0; i--) {
        const j = Math.floor(rngizz() * (i + 1));
        [albumListArr[i], albumListArr[j]] = [albumListArr[j], albumListArr[i]];
    }

    const todayDate = new Date();
   // const month = todayDate.getMonth() + 1 // Months are zero-based, so add 1
   // const day = todayDate.getDate();

   const month = 12
   const day = 22

    for (let i = 0; i < 25; i++) {
        const dateToday = i + 1;

        const trap = document.createElement('div');
        trap.className = "trap";

        const trapdoor = document.createElement('label');
        trapdoor.className = "trapdoor"
        trapdoor.setAttribute("for", `trapCheckbox${i}`)

        if (month == 12 && day >= dateToday) {
            const trapCheckbox = document.createElement('input')
            trapCheckbox.setAttribute("type", "radio")
            trapCheckbox.className = "trapCheckbox"
            trapCheckbox.id = `trapCheckbox${i}`
            trapCheckbox.setAttribute("name", "trap")
            trap.appendChild(trapCheckbox);

            const trapdoorTrap = document.createElement('div');
            trapdoorTrap.className = "trapdoorTrap"

            const releaseName = document.createElement('h4')
            releaseName.textContent = albumListArr[i].releaseName

            const releaseDate = document.createElement('h6')
            releaseDate.textContent = albumListArr[i].releaseDate

            const releaseInfo = document.createElement("div")
            releaseInfo.className = "releaseInfo"
            releaseInfo.appendChild(releaseName)
            releaseInfo.appendChild(releaseDate)

            const links_container = document.createElement("div")
            links_container.className = "links"

            const streamingPlatforms = ['spotify', 'youtube', 'apple', 'bandcamp'];

            streamingPlatforms.forEach(platform => {
                const link = albumListArr[i].streamLinks?.[platform];
                if (link) links_container.appendChild(addLink(platform, link));
            })

            if (albumListArr[i].bootlegger) {
                const bootleggerLink = document.createElement("a")
                bootleggerLink.className = "bootleggerLink"
                bootleggerLink.href = "https://kinggizzardandthelizardwizard.com/bootlegger"
                bootleggerLink.target = "_blank"
                const bootleggerIcon = document.createElement("img")
                bootleggerIcon.className = "bootleggerIcon"
                bootleggerIcon.src = "./linkIcons/bootlegger.png"
                bootleggerLink.appendChild(bootleggerIcon)
                releaseInfo.appendChild(bootleggerLink)
            }

            const reClickInfo = document.createElement("div")
            reClickInfo.className = "re-clickInfo"
            reClickInfo.textContent = "Re-click cover art for official page"

            trapdoorTrap.appendChild(releaseInfo);
            trapdoorTrap.appendChild(links_container);
            trapdoorTrap.appendChild(reClickInfo);

            trap.appendChild(trapdoorTrap);

            const emojiSetSource = albumListArr[i].emojiSet;

            if (day > dateToday) {
                trapdoor.style.backgroundImage = `url(${albumListArr[i].artworkUrl})`;
            }

            if (day === dateToday) {
                //If toady artwork is not stored in variable, it loads the wrong artwork. Why? I maybe know...
                let todayArtwork = 'url(./wrapper.jpg)'
                trapdoor.style.backgroundImage = todayArtwork;
                todayArtwork = `url(${albumListArr[i].artworkUrl})`

                trapdoor.addEventListener('mousedown', function () {
                    const countdown = document.createElement("div");
                    countdown.className = "countdown";
                    countdown.textContent = '1';
                    trapdoor.appendChild(countdown);

                    trapdoor.style.backgroundImage = 'url(./nonagon-infinity.gif)'
                    const tdtInitialDisplay = trapdoorTrap.style.display
                    for (let i = 1; i <= 3; i++) {
                        trapdoorTrap.style.display = "none";
                        setTimeout(() => {
                            countdown.textContent++;
                            if (i === 3) {
                                trapdoorTrap.style.display = tdtInitialDisplay;
                                trapdoor.style.backgroundImage = todayArtwork;
                                countdown.remove()
                            }
                        }, i * 1000);
                    }
                }, { once: true })

                emojiSnow(emojiSetSource)
            }

            trapdoor.addEventListener("click", () => emojiSnow(emojiSetSource))
            trapdoor.addEventListener("click", function () {
                if (trapCheckbox.checked == true && trapdoorTrap.style.display != "none") {
                    window.open(albumListArr[i].officialPage, '_blank');
                }
            })
        } else {
            const lock = document.createElement("div")
            lock.classList = "lock"
            trapdoor.appendChild(lock);
            trapdoor.style.backgroundImage = 'url(./cyboogie.jpg)';
            trapdoor.setAttribute("gizz", "0");
            trapdoor.addEventListener("mousedown", () => {
                let gizzValue = trapdoor.getAttribute("gizz");
                gizzValue++
                if (gizzValue == 100) {
                    gizzValue = "0"
                    trapdoor.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/_un9PYsE1_g?si=t8SGSWmc9sJQVGkZ" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
                        clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe>
                    `
                }
                trapdoor.setAttribute("gizz", gizzValue)
                console.log(gizzValue)
            });
        }

        const doorDay = document.createElement("h2");
        doorDay.textContent = dateToday;
        doorDay.className = "doorDay"

        trapdoor.appendChild(doorDay);
        trap.appendChild(trapdoor);

        month == 12 && day == dateToday
            ? document.querySelector("#todayDoor").appendChild(trap)
            : calendar.appendChild(trap);
    }
    if (todayDoor.innerHTML == "") {
        document.querySelector("#todaysDoorH2").textContent = ""
        document.querySelector("#calendarH2").textContent = "Full Calendar"
    } else {
        document.querySelector("#todaysDoorH2").textContent = "Today's Door"
        document.querySelector("#calendarH2").textContent = "Rest of Calendar"
    }
}

function emojiSnow(emojiArr) {
    const emojiSet = emojiArr === undefined ? ["🦎", "🎄"] : emojiArr
    const snowflake_all = document.querySelectorAll(".snowflake")
    for (let i = 0; i < 6; i++) {
        const emojiIndex = i % emojiSet.length;
        snowflake_all[i].textContent = `${emojiSet[emojiIndex]}`
    }
    console.log(emojiArr)
}

function addLink(name, url) {
    const link = document.createElement("a")
    link.className = "link"
    link.href = `${url}`
    link.target = "_blank"
    const linkTooltip = document.createElement("div")
    linkTooltip.className = "linkTooltip"
    linkTooltip.textContent = `${name}`
    const linkIcon = document.createElement("div")
    linkIcon.className = `linkIcon ${name}Icon`

    link.appendChild(linkTooltip)
    link.appendChild(linkIcon)

    return link
}