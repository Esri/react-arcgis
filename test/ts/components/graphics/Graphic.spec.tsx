import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import Graphic from '../../../../src/ts/components/graphics/Graphic';

export default () => (
    describe('Graphic', () => {
        describe('as a shallow component', () => {
            let graphic;
            beforeEach(() => {
                graphic = shallow(<Graphic />);
            });

            it('should exist', () => {
                expect(graphic).to.exist;
            });
        });

        describe('as a mounted component', () => {
            let graphic
            beforeEach(() => {
                sinon.spy(Graphic.prototype, 'componentDidMount');
                graphic = mount(<Graphic />);
            });

            it('should call componentDidMount', () => {
                expect(Graphic.prototype.componentDidMount['callCount']).to.equal(1);
            });

            describe('esriPromise succeeds', () => {
                before(() => {
                    global['asyncSuccess'] = true;
                });

                beforeEach(() => {
                    graphic = mount(<Graphic />);
                });

                it('should call renderGraphic', (done) => {
                    graphic.instance().renderGraphic = sinon.stub();
                    setTimeout(() => {
                        expect(graphic.instance().renderGraphic.callCount).to.equal(1);
                        done();
                    }, 1);
                });

                after(() => {
                    global['asyncSuccess'] = false;
                });
            });

            describe('esriPromise fails', () => {

            });

            afterEach(() => {
                Graphic.prototype.componentDidMount['restore']();
            });
        });
    })
);
