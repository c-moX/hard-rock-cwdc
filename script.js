// songs data loaded:
// Step: 01 OR 02
const searchSongs = () => {
    const searchText = document.getElementById("search-filed").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        // .catch(error => displayError(error));
        .catch(error => displayError("Something Went Wrong!! Please Try Again Later!"));
}

// Step: 02 OR 01
// const searchSongs = async() => { // For async && await
//     const searchText = document.getElementById("search-filed").value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`
//     // console.log(url);
//     const res = await fetch(url); // For async && await
//     const data = await res.json();
//     displaySongs(data.data);
// }

// displayed songs:
const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    songs.forEach(song => {
        // console.log(song.title); // xxx::xxx
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyric</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}
// ---------------------------------------------------
// --------------------------------------------------------

// lyrics data loaded:
// Step: 01 OR 02
// const getLyric = (artist, title) => {
//     // console.log(artist, title); // xxx::xxx
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
//     // console.log(url);
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
//         // .catch(error => displayError(error));
//         .catch(error => displayError("Something Went Wrong!! Please Try Again Later!"));
// }

// Step: 02 OR 01
const getLyric = async (artist, title) => { // For async && await
    // console.log(artist, title); // xxx::xxx
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    // console.log(url);
    try { // try syntax condition
        const res = await fetch(url); // For async && await
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        // displayError(error);
        displayError("Something Went Wrong!! Please Try Again Later!");
    }
}

// displayed lyrics text:
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}
// -------------------------------------------------

// displayed search result error message:
const displayError = error => {
    const errorTag = document.getElementById("error-message");
    errorTag.innerText = error;
}

