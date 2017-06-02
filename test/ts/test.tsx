import { expect } from 'chai';
import * as sinon from 'sinon';
import { ArcView } from '../../src/ts/components/ArcBase';
import { foo } from '../../src/ts/mockTest';

export default () => (
    describe('The test suite', () => {
        it('should make assertions', () => {
            expect(1).to.equal(1);
        });

        it ('should have access to modules', () => {
            expect(ArcView).to.exist;
        });

        it ('should be able to mock dependencies', () => {
            expect(foo()).to.equal('bar');
        });
    })
);
