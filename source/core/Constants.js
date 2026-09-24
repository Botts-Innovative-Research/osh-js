export const DATA_SYNCHRONIZER_TOPIC = 'data-synchronizer-';
export const TIME_SYNCHRONIZER_TOPIC = 'data-synchronizer-time-';

export const DATASOURCE_DATA_TOPIC = 'datasource-data-';
export const DATASOURCE_TIME_TOPIC = 'datasource-time-';

export const FFMPEG_VIEW_DECODE_TOPIC = 'ffmpeg-decode-';

export const MAGIC_END_PACKET = 'magic-packet';

/**
 * Property stamped onto every record delivered by the "fetch latest observation on connect" seed
 * (see `fetchLatestOnConnect` on the SweApi / ConSysApi datasources)
 *
 * @type {string}
 */
export const LATEST_OBS_SEED_PROP = 'latestObsSeed';
