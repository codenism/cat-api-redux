import React, {Component} from 'react'
import classes from './Cat.css'
import {connect} from 'react-redux'
import {fetchCatImagesById, resetCat} from '../../store/sagas'
import Loader from '../UI/Loader/Loader'

class Cat extends Component {
    componentDidMount() {
        this.props.fetchCatImagesById(this.props.match.params.breed, this.props.match.params.name)
    }

    componentWillUnmount() {
        this.props.resetCat()
    }

    renderImages() {
        return this.props.cat.images.url ? <img className={classes.CatImg} src={this.props.cat.images.url} /> : false
    }

    renderSpecs() {
        
    }

    render() {
        return (
            <div className={classes.Cat}>
                {
                    this.props.loading && this.props.cat.length == 0 ?
                    <Loader/>
                    :

                    <div className={classes.CatBlock}>
                        <div className={classes.CatImage}>
                            {
                                this.renderImages()
                            }
                        </div>
                        <div className={classes.CatInfo}>
                        <div className={classes.CatDescription}>
                            <div className={classes.CatInfoTitle}>Description</div>
                            { this.props.cat.description }
                        </div>
                        <div className={classes.CatSpecs}>
                            {
                                
                                this.renderSpecs()
                            }
                        </div>
                        </div>
                    </div>
                    
                } 
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
        fetchCatImagesById: (breed, name) => dispatch(fetchCatImagesById(breed, name)),
        resetCat: () => dispatch(resetCat())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cat)