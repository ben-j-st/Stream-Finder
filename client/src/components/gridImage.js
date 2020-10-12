import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';

function GridImage(props) {

    return (
        <GridListTile key={props.key}>
          <img src={props.img} alt={props.title} />
        </GridListTile>
    )
        
}

export default GridImage