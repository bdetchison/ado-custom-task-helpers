import AdoApi from "./api/ado-api";
import { ReleaseEnvironmentVariables } from "./EnvironmentVariables";

export async function getReleaseSnapshot(releaseEnvironmentVariables: ReleaseEnvironmentVariables): Promise<any> {
    let releaseApi = new AdoApi(releaseEnvironmentVariables);
    return await releaseApi.getSnapshot();
}

export async function getCurrentEnvironment(releaseEnvironmentVariables: ReleaseEnvironmentVariables): Promise<any> {
    let response = await getReleaseSnapshot(releaseEnvironmentVariables);

    function getEnvironment(env: any) {
        return env.id === releaseEnvironmentVariables.environmentId
    }

    return response.environments.filter(getEnvironment)[0]
}