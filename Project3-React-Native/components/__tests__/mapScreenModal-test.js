import React from "react";
import "react-native"
import MapScreenModal from "../mapScreenModal";
import renderer from "react-test-renderer";

it('renders correctly', async () => {
    const DATE_TO_USE = new Date('December 17, 2017 03:24:00');
    const _Date = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;
    global.toLocaleDateString = _Date.toLocaleString;

    const tree = renderer.create(<MapScreenModal brother={{snus:["G3,G4"]}}/>).toJSON();
    expect(tree).toMatchSnapshot()
});