import { expect } from 'chai';
import { render, act } from '@testing-library/react';
import { WebMap, WebScene } from '../../../src/ts/components/WebComposites';

export const WebMapTests = () => (
    describe('WebMap', () => {
        it('should exist', async () => {
            const { container } = render(<WebMap id="foobar" />);

            await act(() => {
                expect(container.querySelector('#base-container')).to.exist;
            });
        });
    })
);

export const WebSceneTests = () => (
    describe('WebScene', () => {
        it('should exist', async () => {
            const { container } = render(<WebScene id="foobar" />);

            await act(() => {
                expect(container.querySelector('#base-container')).to.exist;
            });
        });
    })
);
