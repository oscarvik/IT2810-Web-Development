import React,{Component} from "react";
import './category_list.css'

class CategoryList extends Component {

    render(){

        return(
        <div className={"categories"}>
          <div className="category">
            <h2>Picture</h2>
            <form className="form">
                <div>
                    <input className="form-radio" type="radio" name={"pictureCategory"} value={"green"} defaultChecked onChange={() => {this.props.onCategoryChange("pictureCategory","green")}}/> Green
                </div>
                <div>
                    <input className="form-radio" type="radio" name={"pictureCategory"} value={"red"} onChange={() => {this.props.onCategoryChange("pictureCategory","red")}}/> Red
                </div>
                <div>
                    <input className="form-radio" type="radio" name={"pictureCategory"} value={"blue"} onChange={() => {this.props.onCategoryChange("pictureCategory","blue")}}/> Blue
                </div>

            </form>
            </div>

            <div className="category">
            <h2>Text</h2>
            <form>
                <div>
                    <input className="form-radio" type={"radio"} name={"textCategory"} defaultChecked value={"haiku"} onChange={() => {this.props.onCategoryChange("textCategory","haiku")}}/> Haiku
                </div>
                <div>
                    <input className="form-radio" type={"radio"} name={"textCategory"} value={"songs"} onChange={() => {this.props.onCategoryChange("textCategory","songs")}}/> Song
                </div>
                <div>
                    <input className="form-radio" type={"radio"} name={"textCategory"} value={"poem"} onChange={() => {this.props.onCategoryChange("textCategory","poem")}}/> Poem
                </div>
            </form>
          </div>

          <div className="category">
            <h2>Sound</h2>
            <form className="form">
                <div>
                    <input className="form-radio" type={"radio"} name={"soundCategory"} defaultChecked value={"instrument"} onChange={() => {this.props.onCategoryChange("soundCategory","instrument")}}/> Instrument
                </div>
                <div>
                    <input className="form-radio" type={"radio"} name={"soundCategory"} value={"animal"} onChange={() => {this.props.onCategoryChange("soundCategory","animal")}}/> Animal
                </div>
                <div>
                    <input className="form-radio" type={"radio"} name={"soundCategory"} value={"nature"} onChange={() => {this.props.onCategoryChange("soundCategory","nature")}}/> Nature
                </div>
            </form>
          </div>

        </div>
        );
    }

}

export default CategoryList;
