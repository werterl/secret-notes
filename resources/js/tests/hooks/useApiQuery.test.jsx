import {describe, it, expect, beforeEach, afterEach, afterAll} from "vitest";
import {renderHook, act} from "@testing-library/react";
import {rest as mockHttp} from 'msw';

import useApi from "../../hooks/useApi";
import {setupServer} from "msw/node";

const fakeResponse = {data: 'some response'};

const mockServer = setupServer(...[
    mockHttp.get('http://localhost/api/url', (req, res, ctx) => {
        return res(ctx.json(fakeResponse));
    }),
    mockHttp.get('http://localhost/api/404', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({status: 404}));
    }),
]);

describe('useApiQuery hook', () => {
    beforeEach(() => {
        mockServer.listen();
    });

    afterEach(() => {
        mockServer.resetHandlers()
    });

    afterAll(() => {
        mockServer.close();
    });

    it('should make a request', async () => {
        const {result} = renderHook(() => useApi());

        await act(async () => {
            await result.current.doRequest({endpoint: 'url'});
        });

        const {response, requestErrors} = result.current;

        expect(requestErrors).toBe(null);
        expect(response).toEqual(fakeResponse);
    });

    it('should handle errors', async () => {
        const {result} = renderHook(() => useApi());

        await act(async () => {
            await result.current.doRequest({endpoint: '404', method: "GET", postData: null});
        });

        expect(result.current.requestErrors).toMatchObject({status: 404});
        expect(result.current.response).toBe(null);
    });

});
