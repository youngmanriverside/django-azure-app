from django.db import models

# Create your models here.
class Employer(models.Model):
    name = models.CharField(max_length=100, db_column='單位名稱')
    organization = models.CharField(max_length=100, db_column='單位類型')
    employment_insurance = models.CharField(max_length=100, db_column='是否為就保單位')
    subsidy_requirement = models.CharField(max_length=100, null=True, blank=True, db_column='補助需求項目')

    def __str__(self):
        return f'{self.name}__{self.organization}'
    
class plan_employer(models.Model):
    name = models.CharField(max_length=100, db_column='計畫名稱')
    division = models.CharField(max_length=100, db_column='所屬科室')
    type = models.CharField(max_length=100, db_column='計畫別')
    purpose = models.TextField(db_column='目的')
    age = models.CharField(max_length=100, db_column='適用年齡')
    available = models.TextField(db_column='適用對象')
    conditions = models.TextField(db_column='對象條件')
    requirements = models.TextField(db_column='申請資格及條件')
    salary = models.TextField(db_column='核薪方式')
    benefits = models.TextField(db_column='給付標準')
    benefit_interval = models.TextField(db_column='給付期限')
    documents = models.TextField(db_column='應備文件')
    keywords = models.TextField(db_column='關鍵字')
    apply_method = models.TextField(db_column='申請方式')

    def __str__(self):
        return f'{self.name}__{self.type}'
