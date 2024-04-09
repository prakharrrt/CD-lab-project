const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');

document.getElementById("send-btn").addEventListener("click", async () => {
  const setupTextarea = document.getElementById('setup-textarea');
  if (setupTextarea.value) {
    const userInput = setupTextarea.value;
    console.log(userInput);
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;

    try {
      const replyResponse = await fetch('http://localhost:3000/generate-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outline: userInput }),
      });

      const replyData = await replyResponse.json();
      movieBossText.innerText = replyData.reply;

      const synopsisResponse = await fetch('http://localhost:3000/generate-synopsis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ outline: userInput }),
      });

      const synopsisData = await synopsisResponse.json();
      console.log(synopsisData.synopsis);

      document.getElementById('output-text').innerText = synopsisData.synopsis;

      const titleResponse = await fetch('http://localhost:3000/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ synopsis: synopsisData.synopsis }),
      });

      const titleData = await titleResponse.json();
      document.getElementById('output-title').innerText = titleData.title;

      const starsResponse = await fetch('http://localhost:3000/extract-stars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ synopsis: synopsisData.synopsis }),
      });

      const starsData = await starsResponse.json();
      document.getElementById('output-stars').innerText = starsData.stars;
      // const imageDescriptionResponse = await fetch('http://localhost:3000/generate-image-description', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ title: titleData.title, synopsis: synopsisData.synopsis }),
      // });

      // const imageDescriptionData = await imageDescriptionResponse.json();
      // console.log(imageDescriptionData.imageDescription);
    } catch (error) {
      console.error('Error:', error);
    }
  }
});
