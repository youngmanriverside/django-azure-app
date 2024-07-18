# Run this script in Django shell
# Command: python manage.py shell < loadcsv.py

from interview.models import interview_question
import pandas as pd

print("Import done")

# Read csv file into a pandas dataframe
df = pd.read_csv('static/data/interview_questions_new.csv')

# Iterate through the dataframe,
# assign text in the "Question" column to the question field of the interview_question model
# assign translated text in the "Question_zh" column to the question_zh field of the interview_question model
for i in range(len(df)):
    question = df.loc[i, 'Question']
    question_zh = df.loc[i, 'Question_zh']
    interview_question.objects.create(question=question, question_zh=question_zh)