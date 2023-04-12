import axios from 'axios';
import Cookies from 'js-cookie';


export const signUp = async(firstName, lastName, email, password) => {
    let response = await axios.post('/signup/', {
        'first_name' : firstName,
        'last_name' : lastName,
        'email' : email,
        'password' : password
    });
    console.log(response.data.success)
    return response.data.success
}


export const logIn = async(loginEmail, loginPassword, setUser) => {
    let response = await axios.post('/signin/', {
        'email' : loginEmail,
        'password' : loginPassword
    });
    
    console.log(response.data.signin)

    const getCurrentUser = async () => {
        setUser(await currentUser());
      }
      getCurrentUser()

    return response.data.signin
}

export const currentUser = async() => {
    let response = await axios.get('currentuser/')
    console.log(response.data)
    return response.data
}

export const logOut = async (setUser) => {
    let response = await axios.post('signout/')
    console.log(response)

    const getCurrentUser = async () => {
        setUser(await currentUser());
      }
      getCurrentUser()

    return response.data.signout
}




/*

useEffect (() => {
    const getCurrentUser = async () => {
      setUser(await currentUser());
    }
    getCurrentUser()
  }, []);

*/