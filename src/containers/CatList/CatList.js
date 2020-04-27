import React, {Component} from 'react'
// import classes from './CatList.css'
import Cat from '../../components/Cat/Cat'

class CatList extends Component {
    render() {
        return (
            <div>
                <h1>Список котеек</h1>
                <Cat meow="meowwww"/>
            </div>
        )
    }
}

export default CatList