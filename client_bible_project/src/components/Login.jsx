import { useState, useEffect, useContext } from "react";
import { logIn } from "../utilites";
import { UserContext } from "../App";

export function LogIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const {user, setUser} = useContext(UserContext)
    
//   useEffect(() => {
//     console.log(loginEmail, loginPassword);
//   }, [loginEmail, loginPassword]);


  return (
    <>
    {user.user_data === null ?  
      
    
        <div className="container border rounded-2 login_card">
            <div className="card">
                <div className="card-body">
                    <form
                    onSubmit={(event) => [
                        event.preventDefault(),
                        logIn(loginEmail, loginPassword, setUser),
                        setLoginEmail(""),
                        setLoginPassword(""),
                    ]}
                    >
                    <h4 className="card-title">Log In</h4>
                    <div className="row">
                        <div className="col-5" >
                            <div class="form-floating mb-3">
                                <input
                                    className="form-control" 
                                    id="floatingInput"
                                    value={loginEmail}
                                    onChange={(event) => setLoginEmail(event.target.value)}
                                    placeholder="email"
                                />
                                <label for="floatingInput">Email address</label>
                            </div>
                        </div>
                        <div className="col-5" >
                            <div class="form-floating mb-3">
                                <input
                                    className="form-control"
                                    id="floatingPassword"
                                    value={loginPassword}
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                    placeholder="password"
                                    type="password"
                                />
                                <label for="floatingPassword">Password</label>
                            </div>
                        </div>
                        <div className="col-2" >
                            <input className="btn btn-primary btn-lg mt-1" type="submit" value="Log In" />
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        : <>Welcome {user.user_data.first_name} {user.user_data.last_name} you are logged in</>}
    </>
    );
}

export default LogIn;



