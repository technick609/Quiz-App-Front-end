// > Fetch Questions

// Retrive all questions from api
// Start loading state true
// Construct the api url using process.env
// make GET request using axios.get(url) 
// If it is successfull, call handleResponse function
// If error occurs, call handleError
// loading state false
// try catch finally async await used

import axios from 'axios';

async function fetchQuestionsApi(setLoading, handleResponse, handleError) {
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_BASED_URL;
        const endPoint = "/v1/questions";
        const url = new URL(endPoint, baseUrl);
        console.log(url);
        const response = await axios.get(url);
        console.log("Not getting" + response.data);
        handleResponse(response.data);
    } catch (error) {
        handleError(error.response?.data?.message || "unkown error occured");
    }
    finally{
        setLoading(false);
    }
}

export default fetchQuestionsApi;