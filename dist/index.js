document.body.addEventListener('load', fetchBookmarks());

// listen for form submit

document.querySelector('#bookmarks-form').addEventListener('submit', saveBookmark);

function saveBookmark(event) {
  // prevent form from submitting
  event.preventDefault();

  // get form values
  const siteName = document.querySelector('#site-name').value;
  const siteUrl = document.querySelector('#site-url').value;

  if(!siteName || !siteUrl) {
    alert('Пожалуйста, заполните поля формы!');
    return false;
  }

  // save data as an array of objects
  const bookmark = {
    "name": siteName,
    "url": `http://${siteUrl}`
  }

  // ls only store strings
  // i can parse JSON to string
  // chek to see if any bookmarks exists
  if(localStorage.getItem('bookmarks') === null) {
    // if not - create an array
    const bookmarks = [];
    // add to array new bookmark
    bookmarks.push(bookmark);
    // save in ls
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // if something in bookmarks - fetch it from LS
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // add bookmark to array
    bookmarks.push(bookmark);
    // re-set bookmarks back to LS
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.forms[0].reset();

  // fetch bookmarks again
  fetchBookmarks();
}

// fetch bookmarks

function fetchBookmarks() {
  // get bookmarks from LS
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // console.log(bookmarks);
  // get element for outputting
  const bookmarksResults = document.querySelector('#bookmarks-results');
  // create output
  bookmarksResults.innerHTML = '';
  if(bookmarks) {
    for (let i = 0; i < bookmarks.length; i++) {
      const siteName = bookmarks[i].name;
      const siteUrl = bookmarks[i].url;
      //bild output
      bookmarksResults.innerHTML += `
      <div class="bookmarks-results__item">
        <h3 class="bookmarks-results__heading">${siteName}
          <a href="${siteUrl}" class="bookmarks-results__link bookmarks-results__link--forward" target="_blank">Перейти</a>
          <a href="#" class="bookmarks-results__link bookmarks-results__link--delete" onclick="deleteBookmark('${siteUrl}')">Удалить</a>
        </h3>
      </div>  
    `
    }
  }
}

// delete bookmark

function deleteBookmark(url) {
  // get bookmarks from ls
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop to find target bookmark
  for(let i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url === url) {
      // remove bookmark from array
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // console.log(bookmarks);

  // fetch bookmarks again
  fetchBookmarks();
}