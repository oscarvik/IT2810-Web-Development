import React, { Component } from 'react';
import ItemList from "./item_list";
import CategoryList from "./category_list";

class PageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Welcome view
            currentListItem: {text:"Welcome"},
            // Will be the chosen category for the media.
            pictureCategory: "green",
            textCategory: "haiku",
            soundCategory: "instrument",
        };

        this.onTabChange = this.onTabChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
    }



    onTabChange(listItem){
        this.setState({
            currentListItem: listItem
            })
        this.unselectTabs();
        document.getElementById(listItem.id).style.backgroundImage="linear-gradient(#40464b,#40464b,white)";
        document.getElementById("showroom_audio_container").style.display='block';
    }

    unselectTabs(){
      for(let i=1; i<5; i++){
        document.getElementById("ART PIECE "+i).style.backgroundImage="linear-gradient(#40464b,#3a3a3a)";
      }
    }


    //Make sure that when a category is changed, we need to render again
    onCategoryChange(name, value){
        //name would for example be pictureCategory and value could be blue
        if(name === "pictureCategory"){
            this.setState({pictureCategory: value})
        }
        else if(name === "textCategory"){
            this.setState({textCategory: value});
        }
        else if(name === "soundCategory"){
            this.setState({soundCategory: value});
        }
        // Changes the view after category change
        this.setState({currentListItem: {picture:"",text:"Please choose a image from the tabs [Image 1-4]",sound:"sounds/animal/0.mp3"}})
        this.unselectTabs();
        document.getElementById("showroom_audio_container").style.display='none';
    }


    render() {
        return(
            <div className="page_container">
                <h1 className={"header"}>SHOWROOM</h1>
                <CategoryList onCategoryChange={this.onCategoryChange}/>
                <div className="showroom_container">
                    <div className={"showroom"}>
                        <ItemList onTabChange={this.onTabChange} pictureCategory={this.state.pictureCategory} textCategory={this.state.textCategory} soundCategory={this.state.soundCategory} />
                        <div dangerouslySetInnerHTML={{__html: this.state.currentListItem.picture}} className="showroom_image"/>
                        <div className="showroom_text_container">
                            <p className="showroom_text">{this.state.currentListItem.text}</p>

                            <audio id="showroom_audio_container" className="showroom_audio" src={this.state.currentListItem.sound} controls/>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default PageContainer;
