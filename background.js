

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const { action, data } = request;

    console.log("Received action:", action);
    console.log("Data:", data);

  

    // Returning true to keep the channel open for async operations
    switch(action) {
        case "summarize":
            setTimeout(() => {
                sendResponse({ "output" : result });
            }, 1000);  
            return true; // Important: keep the channel open for asynchronous response

        case "translate":
            setTimeout(() => {
                sendResponse({ "output" : result });
            }, 1000);  
            return true;

        case "meaning":
            setTimeout(() => {
                sendResponse({ "output" : result });
            }, 1000);  // Simulate async delay
            return true; 

        case "information":
            setTimeout(() => {
                sendResponse({ "output" : result });
            }, 1000);  
            return true;

        default:
            sendResponse({ result: "Unknown action" });
            return result;  // Ensure response is sent even for unknown actions
    }
});
