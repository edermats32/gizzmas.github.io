var button = document.createElement("button")
button.innerHTML = "clicke"
button.id = "copyButton"
document.querySelector("body").appendChild(button)
document.getElementById('copyButton').addEventListener('click', function () {
  var releaseItems = document.querySelectorAll(".release-item");
  var releaseNames = document.querySelectorAll(".release-grid-title");
  var releaseDates = document.querySelectorAll(".release-grid-info")
  var releaseContainers = document.querySelectorAll(".release-container")
  var srcToNameMap = new Map();

  for (var i = 0; i < releaseItems.length; i++) {
    var item = releaseItems[i];
    var releaseName = releaseNames[i].textContent;
    var releaseDate = releaseDates[i].textContent;
    var releaseLink = `https://kinggizzardandthelizardwizard.com${releaseContainers[i].getAttribute("href")}`
    var src = item.getAttribute('src');

    // Add an entry to the map with 'src' as the key and 'releaseName' as the value
    srcToNameMap.set(releaseLink);
    console.log(releaseLink)
  }

  // Copy the map to the clipboard
  var mapString = JSON.stringify([...srcToNameMap]);
  navigator.clipboard.writeText(mapString).then(function () {
    console.log('Output copied to clipboard');
  }).catch(function (err) {
    console.error('Unable to copy to clipboard', err);
  });
});

