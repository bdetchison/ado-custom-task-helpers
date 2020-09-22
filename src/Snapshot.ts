import AdoApi from "./api/ado-api";
import ReleaseEnvironmentVariables from "./ReleaseEnvironmentVariables";

export default class Snapshot {
    readonly releaseApi: AdoApi;
    protected releaseEnvironmentVariables: ReleaseEnvironmentVariables;

    constructor(releaseEnvironmentVariables: ReleaseEnvironmentVariables) {
        this.releaseApi = new AdoApi(releaseEnvironmentVariables);
        this.releaseEnvironmentVariables = releaseEnvironmentVariables;
    }

    public async getReleaseSnapshot(): Promise<any> {
        return await this.releaseApi.getSnapshot();
    }

    public async getCurrentEnvironment(): Promise<any> {
        let response = await this.getReleaseSnapshot();
        let envId = this.releaseEnvironmentVariables.environmentId

        function getEnvironment(env: any) {
            return env.id === envId
        }

        return response.environments.filter(getEnvironment)[0]
    }
}