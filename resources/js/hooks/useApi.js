import {useEffect, useState} from "react";
import config from "../config";

// Function to perform an request

// Custom hook for API interaction
export default function useApi(initEndpoint = '', initMethod, initPostData) {
    const [requestData, setRequestData] = useState({
        endpoint: initEndpoint,
        postData: initPostData || null,
        method: initMethod || 'GET'
    });
    const [response, setResponse] = useState(null);
    const [requestErrors, setRequestErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Create an AbortController instance for cancellation
        const controller = new AbortController();
        // Function to execute the API request
        const doRequest = async () => {
            setRequestErrors(null);
            setResponse(null);
            setIsLoading(true);

            try {
                const responseQuery = await fetch(`${config.API_URL}${requestData.endpoint}`, {
                    method: requestData.method,
                    timeout: config.requestTimeout,
                    ...(requestData.postData ? {body: JSON.stringify(requestData.postData)} : {}),
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async (resp) => {
                    if (resp.ok)
                        return resp;

                    let json = {};
                    try {
                        json = await resp.json();
                    }catch{}

                    const error = Error("Request error");
                    error.response = {status: resp.status, data: json};
                    throw error;
                });

                if (responseQuery.status !== 204) {
                    const responseJson = await responseQuery.json();
                    setResponse(responseJson);
                } else {
                    // for delete query
                    setResponse(true);
                }

            } catch (e) {
                setRequestErrors(e?.response || {});
            }

            setIsLoading(false);
        }

        // Perform the request only if there's a non-empty endpoint
        if (requestData.endpoint) {
            doRequest();
        }

        // Cleanup function to cancel the request on component unmount
        return () => {
            controller.abort();
        }
    }, [requestData]);

    // Return response, errors, and loading state along with a function to update request data
    return {response, requestErrors, isLoading, doRequest: setRequestData};
}
