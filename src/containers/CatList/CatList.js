import React, {Component} from 'react'
import classes from './CatList.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import {fetchCats} from '../../store/sagas'

class CatList extends Component {
    renderCats() {
        return this.props.cats.map(cat => (
            <NavLink className={classes.Cat} to={`/cats/${cat.id}/${cat.name}`}>
                <div className={classes.CatName}>{cat.name}</div>
            </NavLink>
        ))
    }

    componentDidMount() {
        this.props.fetchCats()
    }

    render() {
        return (        
            <div className={classes.CatList}>
                <h1 className={classes.CatHeader}>Cat breeds</h1>
                {
                    this.props.loading && this.props.cats.length == 0 ?
                    <Loader/>
                    :
                    <div className={classes.CatContainer}>{ this.renderCats() }</div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cats: state.cats.cats,
        loading: state.cats.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCats: () => dispatch(fetchCats())
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(CatList)