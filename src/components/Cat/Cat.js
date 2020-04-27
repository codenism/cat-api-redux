import React from 'react'
import classes from './Cat.css'

const Cat = props => (
    <div className={classes.Cat}>
        124
        {props.meow}
    </div>
)

export default Cat