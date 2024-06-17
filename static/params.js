function params(userMessage) {

    // Set parameters for the normal chat
    var params_chat = {
        "messages":[
            {
                "role": "system",
                "content": "你是一個幫助人們就業的機器人，語言模式為繁體中文"
            },
            {
                "role": "user",
                "content": userMessage
            }
        ],
        "max_tokens": 500,
        "temperature": 0.2,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "top_p": 0.95,
        "stop": null
    };

    // Set parameters for the training chat
    var params_training_chat = {
        "tools": [
            {
                "type": "code_interpreter"
            }
        ],
        "name": "職業訓練課程推薦",
        "instructions": "讀取csv檔案的課程，請依照關鍵字推薦給使用者，並提供連結",
        "model": "wenshin-gpt-4o",
        "file_ids": [
            "assistant-Xl8jgsFFqMbzPGYZT5C6gTM6"
        ]
    };

    // If userMessage contains a keyword from training_keywords, return params_training_chat
    if (training_keywords.some(keyword => userMessage.includes(keyword))) {
        return params_training_chat;
    } else {
        return params_chat;
    }
}

function get_url(userMessage) {
    // Set the API endpoint URL
    var chat_url = "https://openai-wenshin.openai.azure.com/openai/deployments/wenshin-gpt-4o/chat/completions?api-version=2024-02-15-preview";
    var training_url = "https://openai-wenshin.openai.azure.com/openai/assistants?api-version=2024-02-15-preview";

    // If userMessage contains a keyword from training_keywords, return training_url
    if (training_keywords.some(keyword => userMessage.includes(keyword))) {
        return training_url;
    } else {
        return chat_url;
    }
}
