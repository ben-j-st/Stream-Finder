import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from "./modal"

function GridImage(props) {
    const char = "&#39;"
    const string = toString(props.title)
    function onClick() {
        setShow(true)
        console.log(char.normalize())
    }
    function handleClose() {
        setShow(false)
    }
    const [show, setShow] = React.useState(false)
    return (
        <GridListTile key={props.key}>
            <img src={props.img} alt={props.title} style={{maxHeight: "237px"}} onClick={onClick}/>
            {show? (
                <Modal 
                show={show}
                img={props.img}
                setShow={setShow}
                handleClose={handleClose}
                title={props.title}
                description={props.description}
                char={char}
                string={string}
            />
            ): (
                <>
                </>
            )}
            
        </GridListTile>
    )
        
}

export default GridImage