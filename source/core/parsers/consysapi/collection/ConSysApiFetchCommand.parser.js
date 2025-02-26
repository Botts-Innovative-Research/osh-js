import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import Command from "../../../consysapi/command/Command";

class ConSysApiFetchCommandParser extends ConSysApiCollectionObjectParser {
    constructor(networkProperties, systemId) {
        super(networkProperties);
        this.systemId = systemId;
    }

    parseData(data) {
        return new Command(
            {
                ...data,
                systemId: this.systemId
            },
            this.networkProperties
        );
    }
}

export default ConSysApiFetchCommandParser;
