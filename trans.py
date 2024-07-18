import requests, uuid, json


def translate_text(text):
    # Add your key and endpoint
    # Add your key and endpoint
    key = "1985745ad5aa45f48973d75d0a790371"
    endpoint = "https://api.cognitive.microsofttranslator.com"

    # location, also known as region.
    # required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
    location = "eastus"

    path = '/translate'
    constructed_url = endpoint + path

    params = {
        'api-version': '3.0',
        'from': 'en',
        'to': ['zh-Hant']
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
        # location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    # You can pass more than one object in body.
    body = [{
        'text': text
    }]

    request = requests.post(constructed_url, params=params, headers=headers, json=body)
    response = request.json()

    # print(json.dumps(response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': ')))

    result = response[0]['translations'][0]['text']
    return result


if __name__ == '__main__':
    # a csv file with the "Question" column, translate the text in the "Question" column
    # and save the translated text in the "Question_zh" column
    import pandas as pd

    df = pd.read_csv('static/data/interview_questions.csv')

    for i in range(len(df)):
        text = df.loc[i, 'Question']
        translated_text = translate_text(text)
        print(f'{text} -> {translated_text}')
        df.loc[i, 'Question_zh'] = translated_text

    df.to_csv('static/data/interview_questions_new.csv', index=False)

