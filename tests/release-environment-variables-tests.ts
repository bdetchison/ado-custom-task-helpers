import * as assert from "assert"
import tl = require('azure-pipelines-task-lib/task');
import { ImportMock } from 'ts-mock-imports';
import { ReleaseEnvironmentVariables } from "../src/environment-variables";

describe("Release Environment Variables", function () {
    const arbitraryAttemptNumber = "arbitraryAuthToken";
    const arbitraryDefinitionName = "arbitraryDefinitionName";
    const arbitraryEnvironmentId = "1";
    const arbitraryEnvironmentName = "arbitraryEnvironmentName";
    const arbitraryReleaseId = "arbitraryReleaseId";
    const arbitraryReleaseName = "arbitraryReleaseName";
    const arbitraryReleaseWebUrl = "arbitraryReleaseWebUrl";
    const arbitraryAccessToken = "arbitraryAccessToken";
    const arbitraryReleaseStartTime = new Date().toISOString().replace('T', ' ');
    const arbitraryBuildRepositoryName = "arbitraryBuildRepositoryName";
    const arbitraryBuildSourceVersion = "arbitraryBuildSourceVersion";
    const arbitraryProjectName = "arbitraryProjectName";
    const arbitraryAdoServerUri = "https://arbitrary.vsrm.visualstudio.com/";
    const arbitraryPipelineStartTime ="2020-09-22 21:04:36-04:00";

    beforeEach(function () {
        let getVariableStub = ImportMock.mockFunction(tl, "getVariable")
        getVariableStub.withArgs("Release.AttemptNumber").returns(arbitraryAttemptNumber);
        getVariableStub.withArgs("Release.DefinitionName").returns(arbitraryDefinitionName);
        getVariableStub.withArgs("Release.EnvironmentId").returns(arbitraryEnvironmentId);
        getVariableStub.withArgs("Release.EnvironmentName").returns(arbitraryEnvironmentName);
        getVariableStub.withArgs("Release.ReleaseId").returns(arbitraryReleaseId);
        getVariableStub.withArgs("Release.ReleaseName").returns(arbitraryReleaseName);
        getVariableStub.withArgs("Release.ReleaseWebURL").returns(arbitraryReleaseWebUrl);
        getVariableStub.withArgs("Release.Deployment.StartTime").returns(arbitraryReleaseStartTime);
        getVariableStub.withArgs("BUILD_SOURCEVERSION").returns(arbitraryBuildSourceVersion);
        getVariableStub.withArgs("BUILD_REPOSITORY_NAME").returns(arbitraryBuildRepositoryName);
        getVariableStub.withArgs("SYSTEM_TEAMPROJECT").returns(arbitraryProjectName);
        getVariableStub.withArgs("SYSTEM_TEAMFOUNDATIONSERVERURI").returns(arbitraryAdoServerUri);
        getVariableStub.withArgs("SYSTEM_PIPELINESTARTTIME").returns(arbitraryPipelineStartTime);

        let getEndpointAuthorizationParameterStub = ImportMock.mockFunction(tl, "getEndpointAuthorizationParameter")
        getEndpointAuthorizationParameterStub.withArgs("SystemVssConnection", "AccessToken", true).returns(arbitraryAccessToken)
    });

    afterEach(function () {
        ImportMock.restore();
    });

    describe("when newed up", function () {
        it('populates populates all the properties from the Task Library calls', async () => {
            let release = new ReleaseEnvironmentVariables();

            assert.strictEqual(release.attemptNumber, arbitraryAttemptNumber, "invalid attempt number");
            assert.strictEqual(release.definitionName, arbitraryDefinitionName, "invalid definition name");
            assert.strictEqual(release.environmentId, +arbitraryEnvironmentId, "invalid environment id");
            assert.strictEqual(release.environmentName, arbitraryEnvironmentName, "invalid environment name");
            assert.strictEqual(release.id, arbitraryReleaseId, "invalid release id");
            assert.strictEqual(release.name, arbitraryReleaseName, "invalid release name");
            assert.strictEqual(release.link, arbitraryReleaseWebUrl, "invalid release web url");
            assert.strictEqual(release.startTime, arbitraryReleaseStartTime);
            assert.strictEqual(release.accessToken, arbitraryAccessToken);
            assert.strictEqual(release.buildRepositoryName, arbitraryBuildRepositoryName);
            assert.strictEqual(release.buildSourceVersion, arbitraryBuildSourceVersion);
            assert.strictEqual(release.projectName, arbitraryProjectName);
            assert.strictEqual(release.adoServerUri, arbitraryAdoServerUri);
            assert.strictEqual(release.pipelineStartTime, arbitraryPipelineStartTime);
        });
    })
})