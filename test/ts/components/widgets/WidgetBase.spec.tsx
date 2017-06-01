import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Widget from '../../../../src/ts/components/widgets/WidgetBase';

export default () => (
    describe('Widget', () => {
        let widget;
        beforeEach(() => {
            widget = shallow(<Widget scriptUri="foobar" />);
        });

        it('should exist', () => {
            expect(widget).to.exist;
        });
    })
);
