import { expect } from 'chai';
import * as sinon from 'sinon';
import { ArcView } from '../../../src/ts/components/ArcBase';

export default () => (
    describe('ArcBase', () => {
        it('should have access to ArcView', () => {
            expect(ArcView).to.exist;
        });
    })
);
