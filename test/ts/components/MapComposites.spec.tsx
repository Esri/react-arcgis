import { expect } from 'chai';
import { render, act } from '@testing-library/react';
import { Map, Scene } from '../../../src/ts/components/MapComposites';

export const MapTests = () => (
    describe('Map', () => {
        it('should exist', async () => {
            const { container } = render(<Map />);

            await act(() => {
                expect(container.querySelector('#base-container')).to.exist;
            });
        });
    })
);

export const SceneTests = () => (
    describe('Scene', () => {
        it('should exist', async () => {
            const { container } = render(<Scene />);

            await act(() => {
                expect(container.querySelector('#base-container')).to.exist;
            });
        });
    })
);
