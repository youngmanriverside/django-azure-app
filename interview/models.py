from django.db import models

# Create your models here.
class interview_question(models.Model):
    question_competency = models.CharField(max_length=200)
    question = models.TextField()

    def __str__(self):
        return self.question_competency