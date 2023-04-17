import { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext, SearchContext, BibleBookContext } from "../App";
import axios from "axios";
import BibleBrowseFormater from "./sub/BibleBrowseFormater";
import { audio } from "../utilites";
import AudioComp from "./sub/AudioComp";

export async function retrieveBibleData(value = null) {
  // console.log("VALUE", value)
  let params = value;
  // if (value == null){
  //     const params = {
  //         'name_bible' : "ENGESV",
  //         'book' : "MAT",
  //         'chapter' : 1,
  //         'start' : 1,
  //         'end' : 25
  //     }
  // }
  // console.log(params)
  let response = await axios.post("/passages/", params);
  console.log("LOADER BROWSER2", response.data)

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

  useEffect(() => {
    const settingBibledata = async () => {
      setBiblePassageData(await retrieveBibleData(bibleBook));
    };
    settingBibledata();
  }, [bibleBook]);

  useEffect(() => {
    const link = `/audio/?book=${bibleBook["book"]}&chapter=${bibleBook["chapter"]}&start=${bibleBook["start"]}&end=${bibleBook["end"]}`;
    setAudioLink(link);
  }, [bibleBook]);

  console.log("USER: ", user);
  console.log("AUDIO LINK", audioLink)
  console.log("BibleBrowse Loader Data", biblePassageData)
  console.log(bibleBook);
  return (
    <div className="container">
      
      <AudioComp audioLink={audioLink} bibleBook={bibleBook}/>

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
