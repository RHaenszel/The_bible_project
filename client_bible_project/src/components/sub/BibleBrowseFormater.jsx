import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";




export function BibleBrowseFormater(props){

    // console.log("Props:", props)

    return (
        
               <>
                ({props.verse_start}) {props.verse_text} 
               </>  

    )

}


export default BibleBrowseFormater