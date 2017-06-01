import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';

export default () => (
    describe('ArcBase', () => {
        describe('as a shallow component', () => {
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
        });

        describe('as a mounted component', () => {
            let arcView
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
                arcView = mount(<ArcView loadMap={sinon.stub()} scriptUri={['foo', 'bar']} />);
            });

            it('should call componentDidMount', () => {
                expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
            });

            afterEach(() => {
                ArcView.prototype.componentDidMount['restore']();
            });
        });
    })
);
