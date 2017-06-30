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

                describe('the dataFlow is set to oneTime', () => {
                    beforeEach(() => {
                        widget = shallow(<WidgetElement widgetProperties={{ view: {} }}/>);
                    });

                    it('should exist', () => {
                        expect(widget).to.exist;
                    });
                });

                describe('the dataFlow is set to oneWay', () => {
                    beforeEach(() => {
                        widget = shallow(<WidgetElement dataFlow="oneWay" />);
                    });

                    it('should exist', () => {
                        expect(widget).to.exist;
                    });
                });
            });

        });
    })
);
