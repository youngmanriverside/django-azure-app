function ai_search() {
    api_base = "https://openai-wenshin.openai.azure.com";
    api_key = API_KEY;
    deployment_id = "wenshin-gpt-4o";
    search_endpoint = "https://wenshin-ai-search.search.windows.net";
    search_key = search_key;
    search_index = "wda-qa";

    var parameters = {
        "data_sources":[
           {
              "type":"azure_search",
              "parameters":{
                 "endpoint": "https://wenshin-ai-search.search.windows.net",
                 "index_name": "wda-qa",
                 "semantic_configuration":"default",
                 "query_type":"simple",
                 "fields_mapping":{
                    
                 },
                 "in_scope":true,
                 "role_information":"You are an AI assistant that helps people find information.",
                 "filter":null,
                 "strictness":3,
                 "top_n_documents":5,
                 "authentication":{
                    "type":"api_key",
                    "key": search_key
                 },
              }
           }
        ],
        "messages":[
           {
              "role": "user",
              "content": "我是非自願離職, 我25歲, 請問我適用哪些計畫"
           }
        ],
        "deployment":"wenshin-gpt-4o",
        "temperature":0,
        "top_p":1,
        "max_tokens":800,
        "stop":null,
        "stream":true
    }


    $.ajax({
        url : "https://openai-wenshin.openai.azure.com/openai/deployments/wenshin-gpt-4o/extensions/chat/completions?api-version=2024-02-15-preview",
        // url : api_base + "/openai/deployments/" + deployment_id + "/extensions/chat/completions?api-version=2024-02-15-preview",
        headers: {
            "Content-Type": "application/json",
        },
        type: "POST",
        data: JSON.stringify(parameters),

    }).done(function(response) {
        console.log("respose is here");
        console.log(response["response"]);
    });
}

