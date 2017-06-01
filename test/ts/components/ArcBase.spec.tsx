import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';

export default () => (
    describe('ArcBase', () => {
        let arcView;
        beforeEach(() => {
            arcView = shallow(<ArcView loadMap={sinon.stub()} scriptUri={['foo', 'bar']} />);
        });

        it('should exist', () => {
            expect(arcView).to.exist;
        });

        it('should render a single div', () => {
            expect(arcView.find('div')).to.have.length(1);
        });
    })
);
