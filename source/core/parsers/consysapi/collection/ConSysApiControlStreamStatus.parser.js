import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";

class ConSysApiControlStreamStatusParser extends ConSysApiCollectionObjectParser {
    constructor(networkProperties) {
        super(networkProperties);
        this.textDecoder = new TextDecoder();
    }

    parseData(data, format) {
        let res;
        if(format === 'arraybuffer') {
            res = this.textDecoder.decode(data);
        } else {
            res = JSON.parse(data);
        }
        return JSON.parse(res);
    }
}

export default ConSysApiControlStreamStatusParser;
