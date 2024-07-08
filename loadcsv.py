# Run this script in Django shell
# Command: python manage.py shell < loadcsv.py

from employer.models import plan_employer_detail, plan_employer
from interview.models import interview_question
import pandas as pd

print("Import done")

# Read tsv file into a pandas dataframe
df = pd.read_csv('static/data/interview_questions.tsv', sep='\t')

# Loop through the dataframe and create a new interview_question object for each row
for index, row in df.iterrows():
    interview_question.objects.create(
        # question_competency=row['Competency'],
        question=row['Interview Question']
    )