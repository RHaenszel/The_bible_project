import { useState, useEffect, useContext } from "react";




export function BrowseMenu(props) {

    console.log("PROPS B MENU", props)
    const {bibleBook, setBibleBook} = props
    console.log("B MENU destruct", bibleBook)

    const bookOptions = [
        { label: 'Genesis', value: 'GEN 50' },
        { label: 'Exodus', value: 'EXO 40' },
        { label: 'Leviticus', value: 'LEV 27' },
        { label: 'Numbers', value: 'NUM 36' },
        { label: 'Deuteronomy', value: 'DEU 34' },
        { label: 'Joshua', value: 'JOS 24' },
        { label: 'Judges', value: 'JDG 21' },
        { label: 'Ruth', value: 'RUT 4' },
        { label: '1 Samuel', value: '1SA 31' },
        { label: '2 Samuel', value: '2SA 24' },
        { label: '1 Kings', value: '1KI 22' },
        { label: '2 Kings', value: '2KI 25' },
        { label: '1 Chronicles', value: '1CH 29' },
        { label: '2 Chronicles', value: '2CH 36' },
        { label: 'Ezra', value: 'EZR 10' },
        { label: 'Nehemiah', value: 'NEH 13' },
        { label: 'Esther', value: 'EST 10' },
        { label: 'Job', value: 'JOB 42' },
        { label: 'Psalm', value: 'PSA 150' },
        { label: 'Proverbs', value: 'PRO 31' },
        { label: 'Ecclesiastes', value: 'ECC 12' },
        { label: 'Song of Solomon', value: 'SNG 8' },
        { label: 'Isaiah', value: 'ISA 66' },
        { label: 'Jeremiah', value: 'JER 52' },
        { label: 'Lamentations', value: 'LAM 5' },
        { label: 'Ezekiel', value: 'EZK 48' },
        { label: 'Daniel', value: 'DAN 12' },
        { label: 'Hosea', value: 'HOS 14' },
        { label: 'Joel', value: 'JOL 3' },
        { label: 'Amos', value: 'AMO 9' },
        { label: 'Obadiah', value: 'OBA 1' },
        { label: 'Jonah', value: 'JON 4' },
        { label: 'Micah', value: 'MIC 7' },
        { label: 'Nahum', value: 'NAM 3' },
        { label: 'Habakkuk', value: 'HAB 3' },
        { label: 'Zephaniah', value: 'ZEP 3' },
        { label: 'Hagga', value: 'HAG 2' },
        { label: 'Zechariah', value: 'ZEC 14' },
        { label: 'Malachi', value: 'MAL 4' },
        { label: 'Matthew', value: 'MAT 28' },
        { label: 'Mark', value: 'MRK 16' },
        { label: 'Luke', value: 'LUK 24' },
        { label: 'John', value: 'JHN 21' },
        { label: 'Acts', value: 'ACT 28' },
        { label: 'Romans', value: 'ROM 16' },
        { label: '1 Corinthians', value: '1CO 16' },
        { label: '2 Corinthians', value: '2CO 13' },
        { label: 'Galatians', value: 'GAL 6' },
        { label: 'Ephesians', value: 'EPH 6' },
        { label: 'Philippians', value: 'PHP 4' },
        { label: 'Colossians', value: 'COL 4' },
        { label: '1 Thessalonians', value: '1TH 5' },
        { label: '2 Thessalonians', value: '2TH 3' },
        { label: '1 Timothy', value: '1TI 6' },
        { label: '2 Timothy', value: '2TI 4' },
        { label: 'Titus', value: 'TIT 3' },
        { label: 'Philemon', value: 'PHM 1' },
        { label: 'Hebrews', value: 'HEB 13' },
        { label: 'James', value: 'JAS 5' },
        { label: '1 Peter', value: '1PE 5' },
        { label: '2 Peter', value: '2PE 3' },
        { label: '1 John', value: '1JN 5' },
        { label: '2 John', value: '2JN 1' },
        { label: '3 John', value: '3JN 1' },
        { label: 'Jude', value: 'JUD 1' },
        { label: 'Revelation', value: 'REV 22' },
      ];

    const [bookOptionValue, setBookOptionValue] = useState('LUK 24');
    const [bookValue, setBookValue] = useState('LUK');
    const [chapterValueArray, setChapterValueArray] = useState([])
    const [chapterSelect, setChapterSelect] = useState([1,2])
    
    const bookOptionValueChange = (event) => {
        setBookOptionValue(event.target.value);
    };

    const chapterSelectChange = (event) => {
        setChapterSelect(event.target.value);
    };

    useEffect(() => {
        const bValue = bookOptionValue.substring(0, 3)
        const cValue = Number(bookOptionValue.substring(4))
        const newArray = []
        for(let i = 1; i <= cValue; i++){
            newArray.push(i)
            // console.log("NEW ARRAY INSIDE:", newArray)
        }
        // console.log("NEW ARRAY:", newArray)
        setBookValue(bValue)
        setChapterValueArray(newArray)
        setChapterSelect(1)
        // setBibleBook({...bibleBook, 'book' : bValue})
        
        }, [bookOptionValue]); 
    
    console.log("BOOKVALUE:", bookValue)
    console.log("CHAPTERVALUEARRAY:", chapterValueArray)
    console.log("CHAPTERSELECT:", chapterSelect)
    return (

        <div className="container mb-2">
        <label>
          Select a book:&nbsp;
          <select value={bookOptionValue} onChange={bookOptionValueChange}>
            {bookOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
        &nbsp;&nbsp;&nbsp;&nbsp;Select a Chapter:&nbsp;
          <select value={chapterSelect} onChange={chapterSelectChange}>
            {chapterValueArray.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </label>
        <button className="btn btn-primary btn-sm ms-3 mb-1"
                  onClick={(event) =>
                    setBibleBook({
                      name_bible: "ENGESV",
                      book: bookValue,
                      chapter: chapterSelect,
                      start: 1,
                      end: 5,
                      id: null,
                    })
                  }
                  >Display</button>
      </div>
    );
    

};


export default BrowseMenu

