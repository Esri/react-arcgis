import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';
import { MapBase, WebBase } from '../../../src/ts/components/ArcComposites';

export const MapBaseTests = () => (
    describe('MapBase', () => {
        let mapBase;
        describe('as a shallow component', () => {
            beforeEach(() => {
                mapBase = shallow(<MapBase scriptUri={['foo', 'bar']} />);
            });

            it('should exist', () => {
                expect(mapBase).to.exist;
            });
        });

        describe('as a mounted component', () => {
            beforeEach(() => {
                sinon.spy(ArcView.prototype, 'componentDidMount');
                mapBase = mount(<MapBase scriptUri={['foo', 'bar']} />);
            });

            it('should call componentDidMount', () => {
                expect(ArcView.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {

            });
        });
    })
);

export const WebBaseTests = () => (
    describe('WebBase', () => {
        let webBase;
        beforeEach(() => {
            webBase = shallow(<WebBase id="foobar" scriptUri={['foo', 'bar']} />);
        });

        it('should exist', () => {
            expect(webBase).to.exist;
        });
    })
);
