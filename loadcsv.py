# Run this script in Django shell to load data from csv file to database

from plan.models import plan_employee_details
import pandas as pd

data = pd.read_csv('static/data/labor_plan.csv')

for i in range(len(data)):
    plan_employee_details.objects.create(
        plan_name = data['計畫名稱'][i],
        division = data['所屬科室'][i],
        plan_type = data['計畫別'][i],
        purpose = data['目的'][i],
        apply = data['申請資格及條件'][i],
        benefit = data['給付標準'][i],
        benefit_interval = data['給付期限'][i],
        document_required = data['應備文件'][i],
        apply_method = data['申請方式'][i],
        contact = data['計畫窗口'][i],
        phone = data['電話'][i]
    )