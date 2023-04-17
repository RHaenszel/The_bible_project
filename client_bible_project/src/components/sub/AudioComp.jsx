




export function AudioComp (props){



    // console.log("PROPS:", props)

    return (

        <div>
            {/* {props.bibleBook['book']} */}
            <video key={props.audioLink} width="300" height="30" controls>
            <source
                src={props.audioLink}
                type="video/mp4"
            />
            Your browser does not support the video tag.
            </video>
        </div>



    )


}


export default AudioComp