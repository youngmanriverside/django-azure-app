# Run this script in Django shell
# Command: python manage.py shell < loadcsv.py

from employer.models import plan_employer
import pandas as pd

data = pd.read_csv('static/data/employer_plan.csv')

for i in range(len(data)):
    plan_employer.objects.create(
        name = data['計畫名稱'][i],
        division = data['所屬科室'][i],
        type = data['計畫別'][i],
        purpose = data['目的'][i],
        age = data['適用年齡'][i],
        available = data['適用對象'][i],
        conditions = data['對象條件'][i],
        requirements = data['申請資格/條件'][i],
        salary = data['核薪方式'][i],
        benefits = data['給付標準'][i],
        benefit_interval = data['給付期限'][i],
        documents = data['應備文件'][i],
        keywords = data['特殊關鍵字'][i],
        apply_method = data['申請方式'][i]
    )