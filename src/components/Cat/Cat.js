import React, {Component} from 'react'
import classes from './Cat.css'
import {connect} from 'react-redux'
import {fetchCatById} from '../../store/sagas'

class Cat extends Component {
    componentDidMount() {
        this.props.fetchCatById(this.props.match.params.breed)
    }

    renderImages() {
        return this.props.cat.images ? this.props.cat.images.map(image => (<img className={classes.CatImg} src={image.url} />)) : false
    }

    render() {
        return (
            <div className={classes.Cat}>
                    <div className={classes.CatName}>{this.props.cat.name}</div>
                    <div className={classes.CatImage}>
                        {
                            this.renderImages()
                        }
                        
                    </div>
                    <div className={classes.CatDescription}>{this.props.cat.description}</div>
                    <div className={classes.CatSpecs}>
                        <ul className={classes.CatSpecsList}>
                            <li class={classes.CatSpecsItem}>
                                <span className={classes.CatSpecsItemLabel}>Temperament</span>
                                <span className={classes.CatSpecsItemValue}>{this.props.cat.temperament}</span>
                            </li>
                        </ul>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cat: state.cats.cat,
        loading: state.cats.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCatById: breed => dispatch(fetchCatById(breed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cat)