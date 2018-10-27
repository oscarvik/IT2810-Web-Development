import React from "react";
import "react-native"
import PickerModal from "../PickerModal";
import renderer from "react-test-renderer";

it('PickerModal renders correctly', async () => {
    const tree = renderer.create(<PickerModal closeModal={()=>{}} />).toJSON();
    expect(tree).toMatchSnapshot()
});