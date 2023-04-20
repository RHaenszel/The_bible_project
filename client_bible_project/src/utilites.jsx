import axios from 'axios';
import Cookies from 'js-cookie';


export const update = async(firstName, lastName, email, password, pk, oldPassword, setUser) => {
  let response = await axios.post('/update/', {
      'first_name' : firstName,
      'last_name' : lastName,
      'email' : email,
      'password' : password,
      'pk' : pk,
      'old_password' : oldPassword
  });

  if (response.data.success && response.data.password_change){
    let response2 = await axios.post('signout/')
    // console.log(response)

    const getCurrentUser = async () => {
        setUser(await currentUser());
      }
      getCurrentUser()
  }

  console.log(response.data.success, response.data.password_change)
  return response.data.success
}

export const signUp = async(firstName, lastName, email, password) => {
    let response = await axios.post('/signup/', {
        'first_name' : firstName,
        'last_name' : lastName,
        'email' : email,
        'password' : password
    });
    // console.log(response.data.success)
    return response.data.success
}


export const logIn = async(loginEmail, loginPassword, setUser) => {
    let response = await axios.post('/signin/', {
        'email' : loginEmail,
        'password' : loginPassword
    });
    
    // console.log(response.data.signin)

    const getCurrentUser = async () => {
        setUser(await currentUser());
      }
      getCurrentUser()

    return response.data.signin
}

export const currentUser = async() => {
    let response = await axios.get('currentuser/')
    // console.log(response.data)
    return response.data
}

export const logOut = async (setUser) => {
    let response = await axios.post('signout/')
    // console.log(response)

    const getCurrentUser = async () => {
        setUser(await currentUser());
      }
      getCurrentUser()

    return response.data.signout
}

export const search = async (searchTerm, setUser, setSearchData) => {
  let response = await axios.post('/search/', {
    'search_term' : searchTerm,
});
  // console.log("Res Data Newdata", response.data.newdata)
  setSearchData(response.data.newdata)
  const getCurrentUser = async () => {
      setUser(await currentUser());
    }
    getCurrentUser()

  return response.data
}

export const saveJournal = async (journalTitle, journalEntry, bibleBook, setBibleBook) => {
  let response = await axios.post('/journaldata/', {
    'bibleBook' : bibleBook,
    'journalTitle' : journalTitle,
    'journalEntry' : journalEntry,
    'deleteFlag' : false
  })
  // console.log(journalEntry)
  // console.log(bibleBook)

    setBibleBook({
      name_bible: bibleBook.name_bible,
      book: bibleBook.book,
      chapter: bibleBook.chapter,
      start: bibleBook.start,
      end: bibleBook.end,
      id: response.data.id
  })
  // console.log(bibleBook)
  // console.log("saveJournal:", response.data)
  return response.data
}

export const deleteJournal = async (journalTitle, journalEntry, bibleBook) => {
  let response = await axios.post('/journaldata/', {
    'bibleBook' : bibleBook,
    'journalTitle' : journalTitle,
    'journalEntry' : journalEntry,
    'deleteFlag' : true
  })
  // console.log(journalEntry)
  
  // console.log(response.data)
  return response.data
}

export const getJournal = async () => {
  let response = await axios.get('/journaldata/')
  
  // console.log(response.data)
  return response.data
}

// export const audio = async () => {
//   let response = await axios.get('/audio/')

//   console.log(response)
//   return response
// }