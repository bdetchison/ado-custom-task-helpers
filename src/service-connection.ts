import tl = require('azure-pipelines-task-lib/task');

export class ServiceConnection {
    readonly endpointId: string;
    readonly url: string;

    constructor(serviceConnectionName: string) {
        this.endpointId = tl.getInput(serviceConnectionName, true)!;
        this.url = tl.getEndpointUrl(this.endpointId, true)!;
    }

    getEndpointAuthorizationParameters(keys: string[]): { key: string, value: string }[] {
        let parameters: { key: string, value: string }[] = []
        keys.forEach(key => {
            parameters.push({
                key: key,
                value: tl.getEndpointAuthorizationParameter(this.endpointId, key, false)!
            });
        });

        return parameters;
    }

    getEndpointDataParameters(keys: string[]): { key: string, value: string }[] {
        let parameters: { key: string, value: string }[] = []
        keys.forEach(key => {
            parameters.push({
                key: key,
                value: tl.getEndpointDataParameter(this.endpointId, key, false)!
            });
        });

        return parameters;
    }
}