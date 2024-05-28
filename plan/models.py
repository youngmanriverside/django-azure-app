from django.db import models
from .choices import *

# Create your models here.
class plan_employee(models.Model):
    id = models.AutoField(primary_key=True)
    plan_name = models.CharField(max_length=100, unique=True, db_column='計畫名稱')
    plan_type = models.CharField(max_length=100, null=True, blank=True, db_column='計畫別')
    required_employee_current = models.CharField(max_length=100, default='unemployed', db_column='就業狀態')
    required_employee_gender = models.CharField(max_length=100, default='None', db_column='性別限定')
    employee_age_lower_bound = models.IntegerField(default=0, db_column='年齡下限')
    employee_age_upper_bound = models.IntegerField(default=0, db_column='年齡上限')
    employee_unemployment_duration_without_identity = models.IntegerField(default=0, db_column='失業週期(無特殊身份別)')
    employee_unemployment_duration_with_identity = models.IntegerField(default=0, db_column='失業週期(有特殊身份別)')

    class Meta:
        ordering = ['id']
    def __str__(self):
        return self.plan_name

class plan_employee_details(models.Model):
    plan_name = models.CharField(max_length=100, db_column='計畫名稱')
    division = models.CharField(max_length=100, db_column='所屬科室')
    plan_type = models.CharField(max_length=100, db_column='計畫別', null=True, blank=True)
    purpose = models.TextField(db_column='目的', null=True, blank=True)
    apply = models.TextField(db_column='申請資格及條件', null=True, blank=True)
    benefit = models.TextField(db_column='給付標準', null=True, blank=True)
    benefit_interval = models.TextField(db_column='給付期限', null=True, blank=True)
    document_required = models.TextField(db_column='應備文件', null=True, blank=True)
    apply_method = models.TextField(db_column='申請方式', null=True, blank=True)
    contact = models.TextField(db_column='計畫窗口', null=True, blank=True)
    phone = models.CharField(max_length=100, db_column='電話', null=True, blank=True)

    def __str__(self):
        return self.plan_name