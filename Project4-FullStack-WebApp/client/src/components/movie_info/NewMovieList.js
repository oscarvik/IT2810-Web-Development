import React from 'react';
import MovieDetail from './MovieDetail';

const NewMovieList = (props) => {

    const ListItems = () => {
        return (
            props.movies.map((movie, index) => {
                    const directors = movie.credits.crew.filter(crewMember => crewMember.job === 'Director');
                    return (
                        <MovieDetail
                            key={movie._id}
                            movieId={movie._id}
                            title={movie.title}
                            color={index % 2 === 1 ? 'white' : '#F8F8F8'}
                            overview={movie.overview}
                            cast={movie.credits.cast}
                            directors={directors}
                            genres={movie.genres}
                            photo={movie.poster_path}
                            release_date={movie.release_date}
                            rating={movie.vote_average}
                            votes={movie.vote_count}
                            popularity={movie.popularity}
                        />
                    );
                }
            ));
    };
    return (
        <div data-cy={"movie-list"}>
            {ListItems()}
        </div>
    )
};

export default NewMovieList;
