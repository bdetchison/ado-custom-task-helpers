import * as assert from "assert"
import nock = require('nock');
import AdoApi from '../../src/api/ado-api';
import { ReleaseEnvironmentVariables } from '../fakes/release-environment-variables-fake';

async function testGetSnapshotFunction(releaseConfiguration: ReleaseEnvironmentVariables) {
    let structureUnderTest = new AdoApi(releaseConfiguration);
    await structureUnderTest.getSnapshot()
}

function testSuccessGetSnapshotFunction(releaseConfiguration: ReleaseEnvironmentVariables, requestPeek: () => void = () => { }) {
    let url = new URL(`${releaseConfiguration.adoServerUri}${releaseConfiguration.projectName}/_apis/release/releases/${releaseConfiguration.id}`);
    const params = new URLSearchParams({ 'api-version': '6.0', 'approvalFilters': 'all' })

    nock(url.origin)
         .get(url.pathname)
         .query(params)
         .reply(200, requestPeek)
 
    testGetSnapshotFunction(releaseConfiguration);
}

async function testFailureGetSnapshotFunction(releaseConfiguration: ReleaseEnvironmentVariables, arbitraryErrorMessage: string): Promise<any> {
    let url = new URL(`${releaseConfiguration.adoServerUri}${releaseConfiguration.projectName}/_apis/release/releases/${releaseConfiguration.id}`);
    const params = new URLSearchParams({ 'api-version': '6.0', 'approvalFilters': 'all' })

    nock(url.origin)
        .get(url.pathname)
        .query(params)
        .reply(500, { "error": { "detail": arbitraryErrorMessage } })

    return testGetSnapshotFunction(releaseConfiguration);
}

describe("ADO-Api", function () {
    let releaseConfiguration = new ReleaseEnvironmentVariables();

    this.afterAll(function () {
        nock.restore();
    });

    describe('When getSnapshot is called', function () {
        it('should call the API with valid auth Header', function (done) {
            const auth = ":" + releaseConfiguration.accessToken
            const basicAuthValue = 'Basic ' + Buffer.from(auth).toString('base64');

            function requestPeek() {
                //@ts-ignore this is needed for nock to work properly
                assert.equal(this.req.headers["authorization"], basicAuthValue, "invalid authorization header was built")
                done();
            }

            testSuccessGetSnapshotFunction(releaseConfiguration, requestPeek);
        })

        describe('When API returns an error', function () {
            it('should throw an exception', async () => {
                let arbitraryErrorMessage = "arbitraryErrorMessage";

                return testFailureGetSnapshotFunction(releaseConfiguration, arbitraryErrorMessage)
                    .then(
                        () => {
                            assert.ok(false, "expected error");
                        }
                        ,
                        (errorMsg: string) => {
                            assert.ok(errorMsg.includes(arbitraryErrorMessage));
                        }
                    )
            });
        })
    })
})