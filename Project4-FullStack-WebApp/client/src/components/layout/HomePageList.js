import React, {Component} from 'react';
import {connect} from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import {ListGroup} from 'reactstrap';

import {Search} from "../../actions/SearchActions";
import NewMovieList from "../movie_info/NewMovieList";
import {MovieLoader} from "../movie_info/MovieLoader";


class HomePageList extends Component {
    state = {
        pageNumber: 2,
        bottom: false,
    };

    // This component will always just find the most popular movies. All the fun happens in searchList
    componentDidMount() {
        this.props.search('movies/search?movieTitle=""&sortOn=popularity&desc=true&page=1&limit=10', 1);
    }


    //Load new movies when on bottom of the screen
    loadNewMovies = () => {
        if (this.props.loading || this.state.bottom) {
            return
        }
        const url = `movies/search?movieTitle=""&sortOn=popularity&desc=true&page=${this.state.pageNumber}&limit=10`;
        this.props.search(url, this.state.pageNumber).then((newMovies) => {
            this.setState({
                bottom: newMovies === 0,
                pageNumber: this.state.pageNumber + 1,
            });
        });
    };

    render() {
        return (
            <div className={"container"} style={{"marginBottom": "20px"}}>
                {this.state.loading && <MovieLoader/>}
                <BottomScrollListener onBottom={this.loadNewMovies}>
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
        movies: state.movie.movies,
        loading: state.movie.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (query, pageNumber) => dispatch(Search(query, pageNumber)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageList);
