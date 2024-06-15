endpoint = "openai-wenshin.openai.azure.com";
// thread_id = "";

function create_thread() {
    $.ajax({
        url: `https://${endpoint}/openai/threads?api-version=2024-02-15-preview`,
        crossDomain: true,
        method: 'post',
        headers: {
          'api-key': API_KEY
        },
        contentType: 'application/json',
        data: ''
      }).done(function(response) {
        context = JSON.stringify(response, null, 2);
        console.log(context);
        thread_id = response.id;
        add_question_thread(thread_id);
        
      });
}

function add_question_thread(thread_id) {
    $.ajax({
        url: `https://${endpoint}/openai/threads/${thread_id}/messages?api-version=2024-02-15-preview`,
        crossDomain: true,
        method: 'post',
        headers: {
          'api-key': API_KEY
        },
        contentType: 'application/json',
        // data: '{\n  "role": "user",\n  "content": "hi"\n}',
        data: JSON.stringify({
          'role': 'user',
          'content': '你好，請幫助我就業'
        })
      }).done(function(response) {
        context = JSON.stringify(response, null, 2);
        console.log(context);
        run_thread(thread_id);
      });
}

function run_thread(thread_id) {
    $.ajax({
        url: `https://${endpoint}/openai/threads/${thread_id}/runs?api-version=2024-02-15-preview`,
        crossDomain: true,
        method: 'post',
        headers: {
          'api-key': API_KEY
        },
        contentType: 'application/json',
        data: JSON.stringify({
            'assistant_id': 'asst_Dv7ETnYdYW15wDOVjEVSHaxv'
        })
      }).done(function(response) {
        context = JSON.stringify(response, null, 2);
        console.log(context);
        run_id = response.id;
        get_run_status(thread_id, run_id);
      });
}

function get_run_status(thread_id, run_id) {
    $.ajax({
        url: `https://${endpoint}/openai/threads/${thread_id}/runs/${run_id}`,
        crossDomain: true,
        headers: {
          'api-key': API_KEY
        },
        data: {
          'api-version': '2024-02-15-preview'
        }
      }).done(function(response) {
        context = JSON.stringify(response, null, 2);
        console.log(context);
        get_assistant_response(thread_id);
      });
}

function get_assistant_response(thread_id) {
    $.ajax({
        url: `https://${endpoint}/openai/threads/${thread_id}/messages`,
        crossDomain: true,
        headers: {
          'api-key': API_KEY
        },
        contentType: 'application/json',
        data: {
          'api-version': '2024-02-15-preview'
        }
      }).done(function(response) {
        // print response in json format
        context = JSON.stringify(response, null, 2);
        console.log(context);
      });
}