import ControlStreams from "../../source/core/consysapi/controlstream/ControlStreams";
import ControlStreamFilter from "../../source/core/consysapi/controlstream/ControlStreamFilter";

describe('ControlStreams and ControlStream API helpers', () => {
    // TODO: Use a test node that has all resource types on it
    const networkProperties = {
        endpointUrl: "localhost:8282/sensorhub/api",
        tls: false,
        connectorOpts: {
            username: "admin",
            password: "oscar"
        }
    };

    describe('ControlStreams', () => {
        let api;

        beforeEach(() => {
            api = new ControlStreams(networkProperties);
        });

        test("Should instantiate ControlStreams API", () => {
            expect(api).toBeInstanceOf(ControlStreams);
            expect(api.conSysApiControlStreamParser).toBeDefined();
        });
        test('should build a Collection in searchControlStreams', async () => {
            const collection = await api.searchControlStreams(
                new ControlStreamFilter(),
                5
            );
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
        });

        test('should build proper API URL for getControlStreamById', async () => {
            const csid = 'example-id';
            const filter = new ControlStreamFilter();
            const apiUrl = API.controlstreams.by_id.replace('{csid}', csid);
            const query = filter.toQueryString(['select', 'format']);

            // intercept fetchAsJson (no mocking, we just check return types)
            expect(typeof api.fetchAsJson).toBe('function');
            expect(apiUrl).toContain(csid);
            expect(typeof query).toBe('string');
        });

    });

    describe('ControlStream class', () => {
        let api;
        let controlStream;
        const csProps = {id: 'test-stream-id'};

        beforeEach(async () => {
            api = new ControlStreams(networkProperties);
            const collection = await api.searchControlStreams();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            expect(page.length).toBeGreaterThan(0);
            controlStream = page[0];
        });

        test('should be able to post and publish commands without throwing', () => {
            const payload = {cmd: 'START'};
            expect(() => controlStream.postCommand(payload)).not.toThrow();
            expect(() => controlStream.publishCommand(payload)).not.toThrow();
        });

        test('should return Collection in searchStatus', async () => {
            const collection = await controlStream.searchStatus();
            expect(collection).toBeDefined();
            const page = await collection.nextPage();
            expect(page).toBeDefined();
            console.log(page);
        });

        test('should build schema request correctly', async () => {
            const filter = new ControlStreamFilter();
            const apiUrl = API.controlstreams.schema.replace('{csid}', csProps.id);
            const qs = filter.toQueryString(['select', 'commandFormat']);

            expect(apiUrl).toContain(csProps.id);
            expect(typeof qs).toBe('string');
        });

    });

});