import React from 'react'
import classes from './Cat.css'

const Cat = props => (
    <div className={classes.Cat}>
        <div className={classes.CatImage}>
            <img className={classes.CatImg} src={props.url} alt={props.name} />
        </div>
        <div className={classes.CatName}>{props.name}</div>
    </div>
)

export default Cat