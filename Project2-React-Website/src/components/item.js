import React from 'react';

const Item = ({picture,text,sound,onTabClicked, id}) => {
    return(
        <div className={"item"} id={id} onClick={() => onTabClicked({picture:picture,text:text,sound:sound, id:id})}>
          {id}
        </div>
    );
};

export default Item;
