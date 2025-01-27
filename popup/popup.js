// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(api_key="AIzaSyAjHwUezAl-I-JmzVokQ7TpIE0V8Y9Y1YY");
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

// async function Analyze(WhatToDO , data ) {
//     const prompt = WhatToDO + " the text";
//     const result =  await model.generateContent([prompt,data ]);
//     return result;
// }

// Get references to DOM elements
const summarize = document.getElementById("summarize");
const translateButton = document.getElementById("translate");
const promptButton = document.getElementById("meaning");
const infoButton = document.getElementById("information");
const pika = document.getElementById("data");  // This is the input field
const clear = document.getElementById("clear");
const output = document.getElementById("output");
const copytoclipboard = document.getElementById("copytoclipboard");



async function sendWordToServer(word,process) {

      const result = await fetch(`http://localhost:8000/${process}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Important: tells the server you're sending JSON
        },
        body: JSON.stringify({ message: word}), // Send the word in a JSON object
      });
      const queen = await result.json();
      if (!result.ok) {
        const errorText = await response.text(); // Get the error message from the server
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      console.log('Server response:' , result , result.data , queen , queen.data);
      output.innerHTML = queen.data;
};


summarize.onclick = () => {
    const val = pika.value;
    console.log("Summarize clicked", val);
    sendWordToServer(val , "Summarize");
};




translateButton.onclick = () => {
    const val = pika.value;
    console.log("Translate clicked", val);
    sendWordToServer(val , "Translate");
};


promptButton.onclick = () => {
    const val = pika.value;
    console.log("Prompt clicked", val);
    sendWordToServer(val , "meaning");
};

// Event listener for 'Information' button
infoButton.onclick = () => {
    const val = pika.value;
    console.log("Information clicked", val);
    sendWordToServer(val , "Information");
};

clear.onclick=()=>{
    pika.value = "";
    output.innerText = "";
    const vallll = " ";
    const key = "text";
    chrome.storage.local.set({ key: vallll }).then(() => {
        console.log(" Empty Value is set");
      });
}

chrome.storage.local.get(["key"]).then((result) => {
    console.log("Value is " + result.key);
    pika.value = result.key;
});

copytoclipboard.onclick=()=>{
    navigator.clipboard.writeText(output.innerText);
}




