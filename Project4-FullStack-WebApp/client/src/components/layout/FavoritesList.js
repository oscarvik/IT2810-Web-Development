import React, {Component} from 'react';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import NewMovieList from '../movie_info/NewMovieList';
import {FetchFavoriteMovies} from "../../actions/UserActions";
import {MovieLoader} from "../movie_info/MovieLoader";
import {ListGroup} from "reactstrap";

class FavoritesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 2,
            bottom: false,
        };
    }

    componentDidMount() {
        if (this.props.user) {
            const {_id} = this.props.user;
            this.props.fetchFavoriteMovies(_id, 1);
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.user.favorites !== this.props.user.favorites) {
            const {_id} = this.props.user;
            this.props.fetchFavoriteMovies(_id, 1);
        }
    };

    loadNewFavorites = () => {
        if (this.state.bottom || this.props.loading) {
            return
        }
        const {_id} = this.props.user;
        this.setState({loading: true}, () => {
            this.props.fetchFavoriteMovies(_id, this.state.pageNumber).then((newMovies) => {
                this.setState({
                    pageNumber: this.state.pageNumber + 1,
                    bottom: newMovies === 0,
                })
            })
        });
    };

    render() {
        if (!this.props.user) {
            return (
                <Redirect to={"/"}/>
            )
        }
        return (
            <div className={"container"} style={{"marginBottom": "20px"}}>
                {this.props.loading && <MovieLoader/>}
                <h3>Favorites:</h3>
                <BottomScrollListener onBottom={this.loadNewFavorites}>
                    <ListGroup>
                        <NewMovieList movies={this.props.movies}/>
                    </ListGroup>
                </BottomScrollListener>
                {this.props.loading && <MovieLoader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        movies: state.movie.movies,
        loading: state.movie.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFavoriteMovies: (userId, pageNumber) => dispatch(FetchFavoriteMovies(userId, pageNumber)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList)
