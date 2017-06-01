import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as WidgetComposites from '../../../../src/ts/components/widgets/WidgetComposites';

export default () => (
    describe('The Widget composites', () => {
        let widget;
        Object.keys(WidgetComposites).forEach((widgetName) => {
            it(`${widgetName} widget should exist`, () => {
                const WidgetElement = WidgetComposites[widgetName]
                widget = shallow(<WidgetElement />);
                expect(widget).to.exist;
            });
        });
    })
);
