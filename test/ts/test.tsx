import { expect } from 'chai';
import * as sinon from 'sinon';
import { ArcView } from '../../src/ts/components/ArcBase';

export default () => (
    describe('the test suite', () => {
        it('should run tests', () => {
            expect(1).to.equal(1);
        });

        it ('should have access to ArcView', () => {
            expect(ArcView).to.exist;
        });
    })
);
