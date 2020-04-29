import React, {Component} from 'react'
import classes from './CatList.css'
import Cat from '../../components/Cat/Cat'
import {connect} from 'react-redux'
import {fetchCats} from '../../store/actions/cats'

class CatList extends Component {
    renderCats() {
        return this.props.cats.map(cat => (
            <Cat name={cat.name} id={cat.id} url={cat.url} />
        ))
    }

    componentDidMount() {
        this.props.fetchCats()
    }

    render() {
        return (
            <div>
                <h1>Список котеек</h1>
                { this.renderCats() }
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