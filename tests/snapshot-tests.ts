import * as assert from "assert"
import tl = require('azure-pipelines-task-lib/task');
import { ImportMock } from 'ts-mock-imports';
import * as AdoApi from "../src/api/ado-api";
import * as Snapshot from "../src/snapshot";
import { ReleaseEnvironmentVariables } from "./fakes/release-environment-variables-fake";

function deepEqual(object1: any, object2: any) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }

    return true;
}

function isObject(object: any) {
    return object != null && typeof object === 'object';
}

describe("Snapshot", function () {
    let releaseConfig = new ReleaseEnvironmentVariables();
    let notExpectEnvironmentId = releaseConfig.environmentId + 1;
    let fakeSnapshotResponse = {
        "environments": [
            {
                "id": notExpectEnvironmentId
            },
            {
                "id": releaseConfig.environmentId
            }
        ]
    };

    beforeEach(function () {
        let adoApiStub = ImportMock.mockClass(AdoApi, "default")
        adoApiStub.mock("getSnapshot", fakeSnapshotResponse);
    });

    afterEach(function () {
        ImportMock.restore();
    });

    describe("when getSnapshot is called", function () {
        it('returns response', async () => {
            let snapshot = await Snapshot.getReleaseSnapshot(releaseConfig);

            assert.ok(deepEqual(snapshot, fakeSnapshotResponse), "objects are not equal");
        })
    })

    describe("when getCurrentEnvironment is called", function () {
        it('returns response', async () => {
            let environment = await Snapshot.getCurrentEnvironment(releaseConfig);

            assert.ok(deepEqual(environment.id, releaseConfig.environmentId), "It did not return back the proper environment");
        })
    })
});