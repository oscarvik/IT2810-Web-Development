import React, {Component} from 'react';
import {
    Navbar,
    Media,
    Form,
    Container,
    Input,
    Button,
    NavItem,
    Nav,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {OptionSearch} from "../../actions/SearchActions";
import {connect} from "react-redux";
import MyPlaceHolderPicture from '../../assets/Mdb-Icon.png';
import profileIcon from '../../assets/profile_Icon.png';

class AppNavbar extends Component {


    timer = null;

    state = {
        searchTerm: '',
        category: 'movies',
        sortType: 'title',
        desc: true,
        isOpen: false,
    };

    toggle = () => {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    // Getting the options that will show in the drop down menu under the search bar
    // The setTimeout functions is set to 150ms as we do not want to search whenever there is a change
    // as it will make the drop down laggy.
    getOptions() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.state.searchTerm) {
            this.timer = setTimeout(() => {
                this.props.optionSearch(this.state.category, this.state.searchTerm);
            }, 150);
        }
    };

    // Rendering the nav part of the navbar depending on whether or not a user is signed in
    renderNavItems = () => {
        if (this.props.loggedIn) {
            return (
              <div>
                <UncontrolledDropdown>
                    <DropdownToggle caret style={{"backgroundColor":"#343a40", "borderColor": "#343a40", "color": "lightgrey"}}>
                      <Media style={{height: 40}} object src={profileIcon} alt="Generic placeholder image"/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem >
                          <h6 style={{"color": "darkgrey"}}>{this.props.user.email}</h6>
                          <Link to={`/favorites`} style={{"color":"black"}}>
                            View Favorite Movies
                          </Link>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            )
        } else {
            return (
                <Nav navbar>
                    <NavItem>
                        <Link to={'/signin'} className={"custom-btn"} style={{"marginLeft": "5px"}}> <Button outline color="secondary" size="sm">Sign
                            In</Button></Link>
                    </NavItem>
                    <NavItem>
                        <Link to={'/signup'} className={"custom-btn"} style={{"marginLeft": "5px"}}><Button outline color="secondary" size="sm">Sign Up</Button></Link>
                    </NavItem>
                </Nav>
            );
        }
    };

    render() {

        let {options} = this.props;
        let {searchTerm, category, sortType, desc} = this.state;
        // as the endpoint in the api uses different variables than our state,
        // we have to change the category accordingly
        category = category === 'movies' ? 'movieTitle' : 'genreName';
        searchTerm = !searchTerm ? '""' : searchTerm;
        // This is the url you will go to if you do a search. The searchList component will know
        // if there has been a change in the URL, and perform a new search based on the new URL
        const searchURL = `${category}=${searchTerm}&sortOn=${sortType}&desc=${desc}`;

        return (
            <div>
                <Navbar color={"dark"} dark expand={"lg"} className={"mb-5"}>
                    <Container class="container-fluid">
                      <Link to={'/'} className={"custom-btn"} style={{"marginLeft": "5px"}}><Media style={{height: 60}} object src={MyPlaceHolderPicture} alt="Generic placeholder image"/></Link>
                      <Link to={'/'} className={"custom-btn"} style={{"marginLeft": "5px"}}><NavbarBrand href="/">MovieBase</NavbarBrand></Link>

                      <NavbarToggler onClick={this.toggle} />
                      <Collapse style={{"width": "100%"}} isOpen={this.state.isOpen} navbar>
                        <Form inline onSubmit={this.handleSubmit} style={{width: "85%"}}>
                            <Input
                                data-cy={"search-bar"}
                                list={"searchbar"}
                                style={{"width": "36%", "marginLeft": "2px"}}
                                type={"text"}
                                placeholder={"Search for movie or genre"}
                                onChange={e => {
                                    // If you clear the search window, you will get the first movies that were available
                                    // Will also clear the options available
                                    this.setState({searchTerm: e.target.value}, () => this.getOptions(e));
                                }}
                            />
                            {options &&
                            <datalist data-cy={"option-list"} id={"searchbar"} style={{height: "200px"}}>
                                {options.map(option => (
                                    <option key={option._id}
                                            value={option[this.state.category.toLowerCase() === "movies" ? "title" : "name"]}/>))}
                            </datalist>}
                            <Input data-cy={"category-input"} style={{"marginLeft": "5px"}} type={"select"} onChange={e => {
                                this.setState({category: e.target.value}, () => this.getOptions())
                            }}>
                                <option value={"movies"}>Movies</option>
                                <option value={"genres"}>Genres</option>
                            </Input>
                            <h6 style={{color: 'white'}}>-sort by-</h6>
                            <Input data-cy={"sort-input"} style={{"width": "70px", "background-color": "lightgrey", "border-color": "lightgrey"}} type={"select"} onChange={e => {
                                this.setState({sortType: e.target.value})
                            }}>
                                <option value={"title"}>Title</option>
                                <option value={"release_date"}>Year</option>
                                <option value={"vote_average"}>Rating</option>
                                <option value={"popularity"}>Popularity</option>
                                <option value={"vote_count"}>Votes</option>
                            </Input>
                            <Input data-cy={"sort-order"} type={"select"} style={{"marginLeft": "5px", "width": "70px", "background-color": "lightgrey", "border-color": "lightgrey"}}
                                   onChange={e => this.setState({desc: !this.state.desc})}>
                                <option>Desc</option>
                                <option>Asc</option>
                            </Input>
                            <Link to={`/search/${searchURL}`}><Button color="warning" data-cy={"search-btn"} style={{"marginLeft": "5px"}}>Search</Button></Link>
                        </Form>
                        {this.renderNavItems()}
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        optionSearch: (index, searchTerm) => dispatch(OptionSearch(index, searchTerm)),
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        options: state.options.options,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
