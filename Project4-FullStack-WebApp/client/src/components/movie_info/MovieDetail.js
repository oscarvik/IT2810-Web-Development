import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ChangeFavoriteMovies} from '../../actions/UserActions';
import {Button, Row, Col} from 'reactstrap';

class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsVisible: false
        };
        this.setDetails = this.setDetails.bind(this);
    }

    setDetails() {
        this.setState({
            detailsVisible: !this.state.detailsVisible
        })
    }

    renderJobDetails(job) {
        const castLength = this.props[job].slice(0, 10).length;
        return this.props[job].slice(0, 10).map((actor, index) => {
            if (index === castLength - 1) {
                return actor.name;
            } else {
                return actor.name + ', ';
            }
        })
    }

    addFavorite = () => {
        const {_id} = this.props.user;
        const {movieId} = this.props;
        this.props.changeFavoriteMovies(_id, movieId, false);
    };

    removeFavorite = () => {
        const {_id} = this.props.user;
        const {movieId} = this.props;
        this.props.changeFavoriteMovies(_id, movieId, true);
    };

    // Renders the favorite button for a user. If the movie is a favorite, it will show an option to remove
    // it from the users' list. If there is no user signed in it will show nothing
    renderFavoriteButton() {
        if (this.props.user) {
            const {favorites} = this.props.user;
            const {movieId} = this.props;
            // checking if this movie id is in the list of favorite movies
            if (favorites.filter(movie => movieId === movie).length === 0) {
                return (
                    <Button id={this.props.title} size={"sm"} className={"favorite-button"}
                    style={{"backgroundColor": "#528c75", "borderColor": "#5da085"}}
                    onClick={this.addFavorite}>Add to Favorites</Button>
                )
            }
            else {
                return (
                    <Button id={this.props.title} size={"sm"} className={"favorite-button"}
                            style={{"backgroundColor": "#875853", "borderColor": "#9b645e"}}
                            onClick={this.removeFavorite}>Remove from Favorites</Button>
                )
            }
        } else {
            return (
                <p></p>
            )
        }
    }

    //Rendering all the job details for a given movie
    renderDetails() {
        return (
            <div className={"movie-detail"}>
                <div className={"row"}>
                    <div className={"col-md-3 col-sm-12"}>
                        <img src={this.props.photo} alt="" height={"360"} width={"240"}/>
                    </div>
                    <div data-cy={"movie-info"} className={"col-md-7 offset-1 col-sm-12"}>
                        <p>{this.props.overview}</p>
                        <h5>Director: {this.renderJobDetails('directors')}</h5>
                        <h5>Cast: {this.renderJobDetails('cast')}</h5>
                        <h5>Genres: {this.renderJobDetails('genres')}</h5>
                        <h5>Popularity: {this.props.popularity}</h5>
                        <h5>Votes: {this.props.votes}</h5>
                    </div>
                </div>
                <div className="col-md-2 offset-5">
                    <Button
                        data-cy={"close-button"}
                        block
                        style={{"marginTop": "1rem", "marginBottom": "1rem"}}
                        onClick={this.setDetails}>Close</Button>
                </div>
            </div>
        );
    }

    render() {
        const details = this.state.detailsVisible ? this.renderDetails() : null;
        return (
            <div className={"container"} style={{'backgroundColor': this.props.color, "border-radius": "5px"}}>
                <div className={"row"} style={{"height": "5rem", "alignItems": "center", "overflow": "hidden"}}>
                    <div className={"col-md-8 col-sm-12"}>
                      <Row onClick={this.setDetails} style={{"cursor": "pointer"}}>
                        <Col>
                        <h4 data-cy={"title"}>
                            {this.props.title} ({this.props.release_date.slice(0, 4)})</h4>
                        </Col>
                        <Col>
                        <h5 data-cy={"rating"}>
                            Rating: {this.props.rating}/10</h5>
                        </Col>
                      </Row>
                    </div>
                    <div className={"col-md-3 col-xs-6"} style={{"flexStart": "end"}}>
                        {this.renderFavoriteButton()}
                    </div>
                </div>
                {details}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        user: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changeFavoriteMovies: (userId, movieId, isDelete) => dispatch(ChangeFavoriteMovies(userId, movieId, isDelete))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
