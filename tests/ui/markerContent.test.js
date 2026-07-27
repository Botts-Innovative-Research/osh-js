import {
    escapeMarkerText,
    getMarkerLabel,
    getMarkerPopupContent,
    updateMarkerContent,
} from '../../source/core/ui/view/map/MarkerContent';

// REQ-VPM-002/003; SCENARIO-VPM-SAFETY-001 and SCENARIO-VPM-DETAIL-001.
describe('Leaflet marker content', () => {
    test('escapes record-controlled marker labels', () => {
        const label = '<img src=x onerror="alert(1)"> & \'quoted\'';

        expect(escapeMarkerText(label)).toBe(
            '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;quoted&#39;'
        );
        expect(getMarkerLabel({label})).toBe(
            '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;quoted&#39;'
        );
    });

    test('keeps trusted description markup while escaping the label', () => {
        expect(
            getMarkerPopupContent({
                name: 'Unit',
                label: '<Unit 7>',
                description: '<table><tr><td>Status</td><td>Ready</td></tr></table>',
            })
        ).toEqual({
            content:
                '&lt;Unit 7&gt;<div><table><tr><td>Status</td><td>Ready</td></tr></table></div>',
            hasContent: true,
        });
    });

    test('reports when a marker has no default popup content', () => {
        expect(getMarkerPopupContent({name: 'Unit', label: null, description: ''})).toEqual({
            content: '<div></div>',
            hasContent: false,
        });
    });

    test('refreshes popup and tooltip content on each observation', () => {
        const marker = {
            getTooltip: jest.fn(() => ({})),
            setTooltipContent: jest.fn(),
            getPopup: jest.fn(() => ({})),
            setPopupContent: jest.fn(),
        };

        updateMarkerContent(
            marker,
            {
                name: 'Unit',
                label: 'Unit 7',
                description: '<table><tr><td>Status</td><td>Moving</td></tr></table>',
                labelOffset: [0, 12],
            },
            jest.fn()
        );
        updateMarkerContent(
            marker,
            {
                name: 'Unit',
                label: 'Unit 7 updated',
                description: '<table><tr><td>Status</td><td>Ready</td></tr></table>',
                labelOffset: [0, 12],
            },
            jest.fn()
        );

        expect(marker.setTooltipContent).toHaveBeenNthCalledWith(2, 'Unit 7 updated');
        expect(marker.setPopupContent).toHaveBeenNthCalledWith(
            2,
            'Unit 7 updated<div><table><tr><td>Status</td><td>Ready</td></tr></table></div>'
        );
    });
});
