import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext, BibleBookContext } from "../App";
import { update } from "../utilites";

export function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { bibleBook, setBibleBook } = useContext(BibleBookContext);

  const navigate = useNavigate();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [fixedEmail, setFixedEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  console.log("USER on Profile", user);

  useEffect(() => {
    if (user["user_data"] != null) {
      setNewFirstName(user["user_data"]["first_name"]);
      setNewLastName(user["user_data"]["last_name"]);
      setFixedEmail(user["user_data"]["email"]);
    }
  }, [user]);
  //Below useEffect gets rid of ID to allow transition back to Journal page in save mode not update
  useEffect(() => {
    setBibleBook({ ...bibleBook, id: null });
  }, []);

  return (
    <>
    
    {user.user_data !== null ?  (
    
    <div className="container w-50">
      <div className="card">
        <div className="card-body">
          <form
            onSubmit={(event) => [
              event.preventDefault(),
              update(
                newFirstName,
                newLastName,
                fixedEmail,
                newPassword,
                user["pk"],
                oldPassword,
                setUser,
                setOldPassword,
                setNewPassword
              ),
              
            ]}
            // style={{ display: "flex", flexDirection: "column" }}
          >
            <h4 className="card-title">Update Profile</h4>
            <div className="rowx">
              <div className="col-5x">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingInputFirst"
                    placeholder="First Name"
                    value={newFirstName}
                    onChange={(event) => setNewFirstName(event.target.value)}
                  />
                  <label for="floatingInputFirst">First Name</label>
                </div>
              </div>
              <div className="col-5x">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingInputLast"
                    placeholder="Last Name"
                    value={newLastName}
                    onChange={(event) => setNewLastName(event.target.value)}
                  />
                  <label for="floatingInputLast">Last Name</label>
                </div>
              </div>
            </div>
            <div className="rowx">
              <div className="col-5x">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingInputEmail"
                    placeholder="Email"
                    value={fixedEmail}
                    readOnly
                  />
                  <label for="floatingInputEmai">Email</label>
                </div>
              </div>
              <div className="col-5x">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={oldPassword}
                    onChange={(event) => setOldPassword(event.target.value)}
                  />
                  <label for="floatingPassword">Enter Old Password</label>
                </div>
              </div>
              <div className="col-5x">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                  <label for="floatingPassword">Enter New Password</label>
                </div>
              </div>
              <div className="col-2x">
                <div class="form-floating mb-3">
                  <input
                    className="btn btn-primary mt-1"
                    type="submit"
                    value="Update"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> ) : <h1>Please Login with your new password</h1>}
    </>
  );
}

export default Profile;
