from django import forms
from employee.models import *
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class plans_filter_form(forms.Form):

    employee = forms.ModelChoiceField(required=True,
                                      widget=forms.Select,
                                      queryset=Employee.objects.all().values_list('name', flat=True),
                                      )
