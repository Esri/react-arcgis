import { expect } from 'chai';
import * as sinon from 'sinon';
import { ArcView } from '../../src/ts/components/ArcBase';

export default () => (
    describe('The test suite', () => {
        it('should make assertions', () => {
            expect(1).to.equal(1);
        });

        it ('should have access to modules', () => {
            expect(ArcView).to.exist;
        });
    })
);
