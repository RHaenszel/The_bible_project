import { useState, useEffect, useContext } from "react";




export function BrowseMenu(props) {

    console.log("PROPS B MENU", props)
    const {bibleBook, setBibleBook} = props
    console.log("B MENU destruct", bibleBook)

    const bookOptions = [
        { label: 'Matthew', value: 'MAT 28' },
        { label: 'Mark', value: 'MRK 16' },
        { label: 'Luke', value: 'LUK 24' },
        { label: 'John', value: 'JHN 21' },
        { label: 'Acts', value: 'ACT 28' },
        { label: 'Romans', value: 'ROM 16' },
        { label: '1 Corinthians', value: '1CO 16' },
        { label: '2 Corinthians', value: '2CO 13' },
        { label: 'Galatians', value: 'GAL 6' },
        { label: 'Ephesians ', value: 'EPH 6' },
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
        // setBibleBook({...bibleBook, 'book' : bValue})
        
        }, [bookOptionValue]); 

    useEffect (() => {
        setBibleBook({...bibleBook, 'book' : bookValue, 'chapter' : 1})
        setChapterSelect(1)
    }, [bookValue])

    useEffect (() => {
        setBibleBook({...bibleBook, 'chapter' : chapterSelect, 'book' : bookValue})
        console.log("INSIDE USEEFFECT BIBLEBOOK:", bibleBook)
    }, [chapterSelect])
    
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
        {/* <p>What book is selected {bookOptionValue}</p> */}
      </div>
    );
    

};


export default BrowseMenu

