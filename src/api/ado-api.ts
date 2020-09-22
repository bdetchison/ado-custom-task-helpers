import needle = require('needle');
import ReleaseEnvironmentVariables from '../ReleaseEnvironmentVariables';

export default class AdoApi {
    private releaseConfiguration: ReleaseEnvironmentVariables;

    constructor(releaseConfiguration: ReleaseEnvironmentVariables) {
        this.releaseConfiguration = releaseConfiguration;
    };

    private getAuthHeader() {
        const auth = ":" + this.releaseConfiguration.accessToken
        const basicAuthValue = 'Basic ' + Buffer.from(auth).toString('base64');
        const headers = {
            Authorization: basicAuthValue
        }

        return headers
    };

    public async getSnapshot(apiVersion="6.0"): Promise<any> {
        let snapshotUrl = `${this.releaseConfiguration.adoServerUri}${this.releaseConfiguration.projectName}/_apis/release/releases/${this.releaseConfiguration.id}?api-version=${apiVersion}&approvalFilters=all`
        return await this.executeRequest(snapshotUrl);
    }

    private async executeRequest(url: string): Promise<any> {
        let options = {
            headers: this.getAuthHeader(),
            json: true,
            follow_max: 100
        };

        return await needle("get", url, options)
            .then((response: any) => {
                if (response.body.error) {
                    let errorDetail = "";
                    if (response.body.error.detail) {
                        errorDetail = response.body.error.detail;
                    }

                    throw (`Invalid Response Code ${response.statusCode} from ADO API: ${response.statusMessage} ${errorDetail}`);
                }

                return response.body;
            });
    }
}