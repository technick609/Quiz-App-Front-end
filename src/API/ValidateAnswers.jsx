// > Validate Answers

// function sends question id and answer API to validate response
// set loading true
// construct api url
// creates req body with question id and answer
// make POST request axios.post (url, requestbody, headers)
// If successful then call handleResponse with API response
// If error occurs then call handleError
// set loading state back to false

import axios from "axios";

async function validateAnswerApi(questionId, answer, handleResponse, handleError, setLoading) {
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_BASED_URL;
        const endPoint = '/v1/questions/validate-answer';
        const url = new URL(endPoint, baseUrl);

        const requestBody = {
            id: questionId,
            answer,
        };
        const response = await axios.post(url, requestBody, {
            headers:{
                'Content-Type': 'application/json', 
            },
        });
        handleResponse(response.data)
    } catch (error) {
        handleError(error.response?.data?.message || "unkown error occured");
    }
    finally{
        setLoading(false)
    }
}

export default validateAnswerApi