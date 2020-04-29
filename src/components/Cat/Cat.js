import React from 'react'
import classes from './Cat.css'

const Cat = props => (
    <div className={classes.Cat}>
        <div className={classes.CatName}>{props.name}</div>
        <div className={classes.CatImage}>
            <img src={props.url} alt={props.name} />
        </div>
    </div>
)

export default Cat