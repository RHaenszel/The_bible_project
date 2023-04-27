import { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext, SearchContext, BibleBookContext } from "../App";
import axios from "axios";
import BibleBrowseFormater from "./sub/BibleBrowseFormater";
import AudioComp from "./sub/AudioComp";
import BrowseMenu from "./sub/BrowseMenu";

export async function retrieveBibleData(value = null) {
  // console.log("VALUE", value)
  let params = value;
  let response = await axios.post("/passages/", params);
  console.log("LOADER BROWSER2", response.data);

  return response.data;
}

export function BibleBrowse() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { searchData, setSearchData } = useContext(SearchContext);
  const { bibleBook, setBibleBook } = useContext(BibleBookContext);

  const [biblePassageData, setBiblePassageData] = useState(null);
  const [audioLink, setAudioLink] = useState(
    "/audio/?book=LUK&chapter=1&start=1&end=2"
  );
  //Below useEffect gets rid of ID to allow transition back to Journal page in save mode not update
  useEffect(() => {
    setBibleBook({ ...bibleBook, id: null });
  }, []);

  useEffect(() => {
    const settingBibledata = async () => {
      setBiblePassageData(await retrieveBibleData(bibleBook));
    };
    settingBibledata();
  }, [bibleBook]);

  useEffect(() => {
    if (biblePassageData != null) {
      const link = `/audio/?book=${biblePassageData["book"]}&chapter=${biblePassageData["chapter"]}&start=${biblePassageData["start"]}&end=${biblePassageData["end"]}`;
      setAudioLink(link);
    }
  }, [bibleBook, biblePassageData]);
  
  useEffect (() => {
    if (biblePassageData != null) { 
    const data = { book : biblePassageData['book'], chapter : biblePassageData['chapter'], end : biblePassageData['end'], name_bible : biblePassageData['name_bible'], start : biblePassageData['start'], id : null
    }
    setBibleBook(data)
    }
  },[])

  console.log("USER: ", user);
  console.log("AUDIO LINK", audioLink);
  console.log("BibleBrowse Loader Data", biblePassageData);
  console.log("BIBLEBOOK", bibleBook);
  return (
    <div className="container">
      <div className="container mt-3 mb-2">
        <BrowseMenu bibleBook={bibleBook} setBibleBook={setBibleBook} />
      </div>

      <div>
        <AudioComp audioLink={audioLink} bibleBook={bibleBook} />
      </div>
      <h2>Bible Browser</h2>
      <div className="container">
        {/* { searchData.length == 0 ? <p>Empty</p> : <p>Not Empty{searchData[0]['book_name']}</p>} */}
        {/* <p>Click card for full Chapter</p> */}
        <div className="card mt-1 me-5 mb-5">
          <h5 className="card-header">
            {biblePassageData !== null
              ? biblePassageData.newdata[0].book_name
              : null}
          </h5>

          <div className="card-body">
            <h6 className="card-title">
              Chapter:{" "}
              {biblePassageData !== null ? biblePassageData.chapter : null}
              &nbsp; &nbsp; Verse:{" "}
              {biblePassageData !== null
                ? biblePassageData.start_verse_number
                : null}{" "}
              to{" "}
              {biblePassageData !== null
                ? biblePassageData.last_verse_number
                : null}
            </h6>

            <div className="container">
              {biblePassageData !== null
                ? biblePassageData.newdata.map((item) => (
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
            <div className="d-flex flex-row justify-content-between p-1">
              <div
                className="btn btn-primary btn-sm mt-2"
                onClick={(event) =>
                  setBibleBook({
                    name_bible: "ENGESV",
                    book: biblePassageData.newdata[0].book_id,
                    chapter: biblePassageData.chapter,
                    start: 1,
                    end: biblePassageData.chapter_last_verse,
                    id: null,
                  })
                }
              >
                View Full Chapter
              </div>
              {user.user_data !== null ? (
                <div
                  className="btn btn-primary btn-sm mt-2"
                  onClick={(event) => [
                    event.preventDefault(),
                    navigate("/journal"),
                  ]}
                >
                  Save
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BibleBrowse;
