const HTML_ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

export function escapeMarkerText(value) {
    return String(value).replace(/[&<>"']/g, character => HTML_ESCAPE_MAP[character]);
}

export function getMarkerLabel(properties) {
    return properties.label == null ? '' : escapeMarkerText(properties.label);
}

export function getMarkerPopupContent(properties) {
    const name =
        Object.prototype.hasOwnProperty.call(properties, 'name') && properties.label != null
            ? getMarkerLabel(properties)
            : '';
    const description =
        Object.prototype.hasOwnProperty.call(properties, 'description') &&
        properties.description != null
            ? properties.description
            : '';

    return {
        content: name + '<div>' + description + '</div>',
        hasContent: name.length > 0 || description.length > 0,
    };
}

export function updateMarkerContent(marker, properties, pointFactory) {
    const tooltip = marker.getTooltip();
    if (properties.label != null) {
        const label = getMarkerLabel(properties);
        if (tooltip) {
            marker.setTooltipContent(label);
        } else {
            marker.bindTooltip(label, {
                permanent: false,
                direction: 'center',
                offset: pointFactory(properties.labelOffset[0], properties.labelOffset[1]),
            });
        }
    } else if (tooltip) {
        marker.unbindTooltip();
    }

    const existingPopup = marker.getPopup();
    if (properties.onLeftClick != null) {
        if (existingPopup) marker.unbindPopup();
        return;
    }

    const popup = getMarkerPopupContent(properties);
    if (popup.hasContent) {
        if (existingPopup) {
            marker.setPopupContent(popup.content);
        } else {
            marker.bindPopup(popup.content, {
                offset: pointFactory(properties.labelOffset[0], properties.labelOffset[1]),
            });
        }
    } else if (existingPopup) {
        marker.unbindPopup();
    }
}
