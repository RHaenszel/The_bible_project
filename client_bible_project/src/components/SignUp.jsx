import { useState, useEffect } from "react";
import { signUp } from "../utilites";
import { useLoaderData, useNavigate } from "react-router-dom";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //   useEffect(() => {
  //     console.log(firstName, lastName, email, password);
  //   }, [firstName, lastName, email, password]);

  return (
    <div className="container">
        <div className="card">
            <div className="card-body">
                <form
                onSubmit={(event) => [
                    event.preventDefault(),
                    signUp(firstName, lastName, email, password),
                    setFirstName(""),
                    setLastName(""),
                    setEmail(""),
                    setPassword(""),
                    navigate("/login")
                ]}
                style={{ display: "flex", flexDirection: "column" }}
                >
                <h4 className="card-title">Sign Up</h4>
                <div className="row">
                    <div className="col-5" >
                        <div class="form-floating mb-3">
                            <input
                                className="form-control" 
                                id="floatingInputFirst"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <label for="floatingInputFirst">First Name</label>
                        </div>
                    </div>
                    <div className="col-5" >
                        <div class="form-floating mb-3">
                            <input
                                className="form-control" 
                                id="floatingInputLast"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <label for="floatingInputLast">Last Name</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-5" >
                        <div class="form-floating mb-3">
                            <input
                                className="form-control" 
                                id="floatingInputEmail"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <label for="floatingInputEmai">Email</label>
                        </div>
                    </div>    
                    <div className="col-5" >
                        <div class="form-floating mb-3">
                            <input
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <div className="col-2" >
                        <div class="form-floating mb-3">
                            <input className="btn btn-primary mt-1" type="submit" value="Sign Up" />
                        </div>
                    </div> 
                </div>
                </form>
            </div>
        </div>
    </div>


  );
}
export default SignUp