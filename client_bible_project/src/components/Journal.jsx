import { useState, useEffect, useContext } from "react";
import { UserContext, SearchContext, BibleBookContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BibleBrowseFormater from "./sub/BibleBrowseFormater";
import { getJournal, saveJournal, deleteJournal} from "../utilites";
import JournalComp from "./sub/JournalComp";

export async function journalBibleData(value = null) {
  // console.log("VALUE", value)
  let params = value;
  // console.log(params)
  let response = await axios.post("/passages/", params);
  // console.log("LOADER BROWSER2", response.data)
  return response.data;
}

export function Journal() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { searchData, setSearchData } = useContext(SearchContext);
  const { bibleBook, setBibleBook } = useContext(BibleBookContext);

//   const [journalID, setJournalID] = useState(null);
  const [journalTitle, setJournalTitle] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [journalBiblePassageData, setJournalBiblePassageData] = useState(null);
  const [storedJournal, setStoredJournal] = useState({entries : []});
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const settingBibledata = async () => {
      setJournalBiblePassageData(await journalBibleData(bibleBook));
    };
    settingBibledata();
  }, [bibleBook]);

  useEffect(() => {
    const settingJournaldata = async () => {
      setStoredJournal(await getJournal());
    };
    settingJournaldata();
  }, [temp]);

  console.log("Journal.jsx StoredJournal:", storedJournal.entries);
//   console.log("Journal.jsx temp:", temp);
//   console.log("BIBLEBOOK:", bibleBook)

  return (
    <div className="container">
      <h2>Journal Page</h2>
      {/* { searchData.length == 0 ? <p>Empty</p> : <p>Not Empty{searchData[0]['book_name']}</p>} */}
      
      {user.user_data !== null ? (
        <p>{user.user_data.first_name}'s Journal page</p>
      ) : (
        <h2>You are not logged in.</h2>
      )}
      {user.user_data !== null ? (
        <div
          className="container d-flex flex-row-reverse border rounded-2
                        justify-content-between 
                        border-success-subtle first_container"
        >


          <div className="container side_bar col-3">
            <p>Side Bar</p>

            {storedJournal.entries.length !== 0 ? 
                    storedJournal.entries.map((item) => (
                        <JournalComp
                        id={item.id}
                        name_bible={item.name_bible}
                        book={item.book}
                        chapter={item.chapter}
                        start={item.start}
                        end={item.end}
                        title={item.title}
                        journal_entry={item.journal_entry}
                        user_fk_id={item.user_fk_id}
                        setJournalTitle={setJournalTitle}
                        setJournalEntry={setJournalEntry}
                        setJournalBiblePassageData={setJournalBiblePassageData}
                        />))
             : <p>No</p>}
          </div>   {/*  end sidebar */}

          
          
          <div className="container mainLeftCol col-9 mt-2">
            {/* { searchData.length == 0 ? <p>Empty</p> : <p>Not Empty{searchData[0]['book_name']}</p>} */}
            {/* <p>Click card for full Chapter</p> */}
            <div className="container mt-1 mb-5">
              <div className="card">
                <h5 className="card-header">
                  {journalBiblePassageData !== null
                    ? journalBiblePassageData.newdata[0].book_name
                    : null}
                </h5>

                <div className="card-body">
                  <h6 className="card-title">
                    Chapter:{" "}
                    {journalBiblePassageData !== null
                      ? journalBiblePassageData.chapter
                      : null}
                    &nbsp; &nbsp; Verse:{" "}
                    {journalBiblePassageData !== null
                      ? journalBiblePassageData.start_verse_number
                      : null}{" "}
                    to{" "}
                    {journalBiblePassageData !== null
                      ? journalBiblePassageData.last_verse_number
                      : null}
                  </h6>

                  <div className="container mb-4">
                    {journalBiblePassageData !== null
                      ? journalBiblePassageData.newdata.map((item) => (
                          <BibleBrowseFormater
                            book_id={item.book_id}
                            book_name={item.book_name}
                            chapter={item.chapter}
                            verse_start={item.verse_start}
                            verse_end={item.verse_end}
                            verse_text={item.verse_text}
                          />
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
            {/* Card Form */}
            <div className="container mb-5">
              <div
                className="card"
                // style={{ height: "450px" }}
              >
                <div className="card-body">
                <h4 className="card-title">Journal Entry</h4>
                { bibleBook['id'] != null
                      ? <button className="card-title" 
                      onClick={(event) => [
                        event.preventDefault(),
                        deleteJournal(journalTitle, journalEntry, bibleBook),
                        setTemp(journalEntry),
                        setJournalTitle(""),
                        setJournalEntry(""),
                        setBibleBook({
                                name_bible: "ENGESV",
                                book: "MAT",
                                chapter: 1,
                                start: 1,
                                end: 2,
                        })
                      ]}
                      >Delete</button>
                      : null }
                  <form
                    onSubmit={(event) => [
                      event.preventDefault(),
                      saveJournal(journalTitle, journalEntry, bibleBook, setBibleBook),
                      setTemp(journalEntry),
                    ]}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    
                    <div className="row">
                      <div className="col">
                        <div class="form-floating mb-3">
                          <input
                            className="form-control"
                            id="floatingInputTitle"
                            placeholder="Title"
                            value={journalTitle}
                            onChange={(event) =>
                              setJournalTitle(event.target.value)
                            }
                          />
                          <label for="floatingInputTitle">Title</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div class="form-floating mb-3">
                          <textarea
                            style={{ height: "300px" }}
                            rows="40"
                            cols="50"
                            className="form-control"
                            id="floatingInputTextArea"
                            placeholder="First Name"
                            value={journalEntry}
                            onChange={(event) =>
                              setJournalEntry(event.target.value)
                            }
                          ></textarea>
                          <label for="floatingInputTextArea">Entry</label>
                        </div>
                      </div>
                    </div>
                    { bibleBook['id'] != null
                      ? bibleBook['id']
                      : null }
                      { bibleBook['id'] != null
                      ? <input
                      className="btn btn-primary mt-3"
                      type="submit"
                      value="Update Entry"
                    />
                      : <input
                      className="btn btn-primary mt-3"
                      type="submit"
                      value="Save Entry"
                    /> }
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>You are not logged in.</h2>
      )}
    </div>
  );
}

export default Journal;
