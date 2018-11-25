import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import NewMovieList from '../movie_info/NewMovieList';
import { MovieLoader } from '../movie_info/MovieLoader';
import { ListGroup } from 'reactstrap';

import { Search } from '../../actions/SearchActions';


class SearchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 2,
            newSearch: false,
            bottom: false
        };
    };

    // This.props.match.params will give us what parameters are in the URL
    componentDidMount() {
        const {query} = this.props.match.params;
        const url = `movies/search?${query}&page=1&limit=10`;
        this.props.search(url, 1)
    }


    // Component will update if there is a change in the url params. For example if there is a change in the chosen sorting category
    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            const {query} = this.props.match.params;
            const url = `movies/search?${query}&page=1&limit=10`;
            this.setState({newSearch: true},() =>
                this.props.search(url, 1).then(() =>
                    this.setState({newSearch: false, pageNumber: 2}
                )));
        }
    };


    // Happens on bottom. If the search function returns 0, we know that we are on the bottom, and will stop searching
    loadNewMoviesFromSearch = () => {
        if (this.props.loading || this.state.bottom) {
            return
        }
        const {query} = this.props.match.params;
        const url = `movies/search?${query}&page=${this.state.pageNumber}&limit=10`;
        this.props.search(url, this.state.pageNumber).then((newMovies) => {
            this.setState({
                bottom: newMovies === 0,
                pageNumber: this.state.pageNumber + 1
            });
        });
    };

    render() {
        return (
            <div className={"container"} style={{"marginBottom": "20px"}}>
                {this.state.newSearch && <MovieLoader/>}
                <BottomScrollListener onBottom={this.loadNewMoviesFromSearch}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);