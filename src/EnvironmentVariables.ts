import tl = require('azure-pipelines-task-lib/task');

export class ReleaseEnvironmentVariables {
    readonly attemptNumber: string;
    readonly definitionName: string;
    readonly environmentId: number;
    readonly environmentName: string;
    readonly id: string;
    readonly name: string;
    readonly link: string;
    readonly startTime: string;
    readonly accessToken: string;
    readonly projectName: string;
    readonly adoServerUri: string;
    readonly pipelineStartTime: string;

    constructor() {
        this.attemptNumber = tl.getVariable("Release.AttemptNumber")!;
        this.definitionName = tl.getVariable("Release.DefinitionName")!;
        this.environmentId = +tl.getVariable("Release.EnvironmentId")!;
        this.environmentName = tl.getVariable("Release.EnvironmentName")!;
        this.id = tl.getVariable("Release.ReleaseId")!;
        this.name = tl.getVariable("Release.ReleaseName")!;
        this.link = tl.getVariable("Release.ReleaseWebURL")!;
        this.startTime = tl.getVariable("Release.Deployment.StartTime")!;
        this.projectName = tl.getVariable("SYSTEM_TEAMPROJECT")!;
        this.adoServerUri = tl.getVariable("SYSTEM_TEAMFOUNDATIONSERVERURI")!;
        this.pipelineStartTime = tl.getVariable("SYSTEM_PIPELINESTARTTIME")!;
        this.accessToken = tl.getEndpointAuthorizationParameter("SystemVssConnection", "AccessToken", true)!;
    }
}

export function getReleaseEnvironmentVariables(): ReleaseEnvironmentVariables {
    return new ReleaseEnvironmentVariables();
}