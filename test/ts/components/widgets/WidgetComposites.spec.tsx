import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import * as WidgetComposites from '../../../../src/ts/components/widgets/WidgetComposites';

export default () => (
    describe('The Widget composites', () => {
        Object.keys(WidgetComposites).forEach((widgetName) => {

            describe(widgetName, () => {
                const WidgetElement = WidgetComposites[widgetName];
                let widget;
                beforeEach(() => {
                    widget = shallow(<WidgetElement />);
                });

                it('should exist', () => {
                    expect(widget).to.exist;
                });
            });

        });
    })
);
