async function setDownloadCount() {
  const date = new Date().toISOString().slice(0, 10);

  const response = await fetch(
    `https://api.npmjs.org/downloads/point/2021-01-01:${date}/emoji-sprinkle`
  );
  const { downloads } = await response.json();

  const downloadCountElement = document.querySelector(".download-count");

  downloadCountElement.innerHTML = downloads;
}

setDownloadCount();
