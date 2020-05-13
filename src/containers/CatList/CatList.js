import React, {Component} from 'react'
import classes from './CatList.css'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCats} from '../../store/sagas'

class CatList extends Component {
    renderCats() {
        return this.props.cats.map(cat => (
            <NavLink to={`/cats/${cat.id}`}>
                <div className={classes.Cat}>
                    <div className={classes.CatImage}>
                        <img className={classes.CatImg} src={cat.url} alt={cat.name} />
                    </div>
                    <div className={classes.CatName}>{cat.name}</div>
                </div>
            </NavLink>
        ))
    }

    componentDidMount() {
        this.props.fetchCats()
    }

    render() {
        return (
            <div className={classes.CatList}>
                <h1 className={classes.CatHeader}>Список котеек</h1>
                <div className={classes.CatContainer}>{ this.renderCats() }</div>
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