import * as assert from "assert"
import tl = require('azure-pipelines-task-lib/task');
import { SinonStub } from "sinon";
import { ImportMock } from 'ts-mock-imports';
import { ReleaseEnvironmentVariables } from "../src/environment-variables";
import { ServiceConnection } from "../src/service-connection";

describe("Service Connection Tests", function () {
    const arbitraryServiceConnectionName = "arbitraryServiceConnectionName";
    const arbitraryUrl = "arbitraryUrl";
    const arbitraryEndpointId = "arbitraryEndpointId";
    let getInputStub: SinonStub;


    beforeEach(function () {
        ImportMock.mockFunction(tl, "getEndpointUrl", arbitraryUrl);
        getInputStub = ImportMock.mockFunction(tl, "getInput");
        getInputStub.withArgs(arbitraryServiceConnectionName).returns(arbitraryEndpointId);
    });

    afterEach(function () {
        ImportMock.restore();
    });

    describe("when newed up", function () {
        it('populates populates endpointId and URL from the task library', async () => {
            let structureUnderTest = new ServiceConnection(arbitraryServiceConnectionName);

            assert.strictEqual(structureUnderTest.url, arbitraryUrl, "url was mutated");
            assert.strictEqual(structureUnderTest.endpointId, arbitraryEndpointId, "endpointId was mutated");
        });
    })

    describe("when getEndpointAuthorizationParameter is called with a set of keys", function () {
        it('it returns the values from the task library', async () => {
            const arbitraryKey1 = "arbitraryKey1"
            const arbitraryKey2 = "arbitraryKey2"
            const arbitraryKey3 = "arbitraryKey3"
            const arbitraryValue1 = "arbitraryValue1"
            const arbitraryValue2 = "arbitraryValue2"
            const arbitraryValue3 = "arbitraryValue3"
            const keys = [arbitraryKey1, arbitraryKey2, arbitraryKey3];

            let getEndpointAuthorizationParameterStub = ImportMock.mockFunction(tl, "getEndpointAuthorizationParameter");
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey1, false).returns(arbitraryValue1);
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey2, false).returns(arbitraryValue2);
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey3, false).returns(arbitraryValue3);

            let structureUnderTest = new ServiceConnection(arbitraryServiceConnectionName);
            let authParameters = structureUnderTest.getEndpointAuthorizationParameters(keys)

            assert.strictEqual(authParameters[0].key, arbitraryKey1, "unexpected key");
            assert.strictEqual(authParameters[0].value, arbitraryValue1, "unexpected key");
            assert.strictEqual(authParameters[1].key, arbitraryKey2, "unexpected key");
            assert.strictEqual(authParameters[1].value, arbitraryValue2, "unexpected key");
            assert.strictEqual(authParameters[2].key, arbitraryKey3, "unexpected key");
            assert.strictEqual(authParameters[2].value, arbitraryValue3, "unexpected key");
        });
    })

    describe("when getEndpointAuthorizationParameter is called with no keys", function () {
        it('it returns an empty array', async () => {

            let structureUnderTest = new ServiceConnection(arbitraryServiceConnectionName);
            let authParameters = structureUnderTest.getEndpointAuthorizationParameters([])

            assert.ok(authParameters.length === 0, "there should be 0 records");
        });
    })

    describe("when getEndpointDataParameter is called with a set of keys", function () {
        it('it returns the values from the task library', async () => {
            const arbitraryKey1 = "arbitraryKey1"
            const arbitraryKey2 = "arbitraryKey2"
            const arbitraryKey3 = "arbitraryKey3"
            const arbitraryValue1 = "arbitraryValue1"
            const arbitraryValue2 = "arbitraryValue2"
            const arbitraryValue3 = "arbitraryValue3"
            const keys = [arbitraryKey1, arbitraryKey2, arbitraryKey3];

            let getEndpointAuthorizationParameterStub = ImportMock.mockFunction(tl, "getEndpointDataParameter");
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey1, false).returns(arbitraryValue1);
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey2, false).returns(arbitraryValue2);
            getEndpointAuthorizationParameterStub.withArgs(arbitraryEndpointId, arbitraryKey3, false).returns(arbitraryValue3);

            let structureUnderTest = new ServiceConnection(arbitraryServiceConnectionName);
            let dataParameters = structureUnderTest.getEndpointDataParameters(keys)

            assert.strictEqual(dataParameters[0].key, arbitraryKey1, "unexpected key");
            assert.strictEqual(dataParameters[0].value, arbitraryValue1, "unexpected key");
            assert.strictEqual(dataParameters[1].key, arbitraryKey2, "unexpected key");
            assert.strictEqual(dataParameters[1].value, arbitraryValue2, "unexpected key");
            assert.strictEqual(dataParameters[2].key, arbitraryKey3, "unexpected key");
            assert.strictEqual(dataParameters[2].value, arbitraryValue3, "unexpected key");
        });
    })

    describe("when getEndpointDataParameter is called with no keys", function () {
        it('it returns an empty array', async () => {

            let structureUnderTest = new ServiceConnection(arbitraryServiceConnectionName);
            let dataParameters = structureUnderTest.getEndpointDataParameters([])

            assert.ok(dataParameters.length === 0, "there should be 0 records");
        });
    })
});