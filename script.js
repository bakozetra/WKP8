let songs = [];
// Grab  the form and the the table
const form = document.querySelector('form');
const listOfSong = document.querySelector('tbody');

// creat an html to show the list of the the detail of the song
const showSongs = () => {
    const html = songs.map(song => {
        return `
        <tr>
            <td><img src="${song.url}" alt=""></td>
            <td class ="left">${song.title} <br>${song.style}</td>
            <td>${song.name} <br> ${song.length}min </td>
            <td>
              <button value ='${song.id}'onclick="buttonClick()" class ="score">
              Score : 0
              </button> 
            </td>
            <td>
            <button value='${song.id}' 
               class ="delete" aria-label ="Delete book ${song.title}">
               <img 
                    src= "./assets/trash.svg" 
                    alt = "${song.title} from list"/>
            </button>
            </td>
        </tr>
        `
    })
    .join('');
    listOfSong.innerHTML= html;
};
showSongs();
// grab all of the input and push it into the songs
const addSongs = e => {
    e.preventDefault();
    console.log(e);
    const formEl = e.currentTarget;
    const newSong = {
        title : formEl.title.value,
        name: formEl.name.value,
        style: formEl.style.value,
        length: formEl.length.value,
        id : Date.now(),
    };
    // Push the function so that it will restore in the object
    songs.push(newSong);
    listOfSong.dispatchEvent(new CustomEvent('listUpdated'));
    formEl.reset();
};

// To deletethe button
const handleClick = e => { 
    console.log(e.target);
       const deleteBtn = e.target.closest('button.delete')
       if (deleteBtn) {
           const id = Number(deleteBtn.value);
           deleteSong(id);
          }
   };

   // checkif the id is notthe same
   const deleteSong = id => {
    songs = songs.filter(song => song.id !== id);
    listOfSong.dispatchEvent(new CustomEvent('listUpdated'))
 };
 

 // add the number of the csore

const score = (e) => {
    console.log(e.target);
    const checkBtn = e.target.closest('button.score');
    var i = 0;
    function buttonClick() {
        checkBtn.value = ++i;
    }
}  
// the initial of the local storage 
const initLocalStorage = () => { 
    const songList = JSON.parse(localStorage.getItem('songs'));
    if(songList) {
       songs = songList;
    }
    listOfSong.dispatchEvent(new CustomEvent ('listUpdated'));
};
// update the localstorage 
const updateLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
};
   

// event listener
form.addEventListener('submit', addSongs);
listOfSong.addEventListener('listUpdated', showSongs);
listOfSong.addEventListener('click' , handleClick);
listOfSong.addEventListener('click' , score);
listOfSong.addEventListener('listUpdated', updateLocalStorage);
initLocalStorage();
