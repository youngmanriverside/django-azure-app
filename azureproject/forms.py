from django import forms
from employee.models import *
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class plans_filter_form(forms.Form):
    employee_list = Employee.objects.all().values_list('id', 'name')
    print(employee_list)

    employee = forms.ChoiceField(
        choices=employee_list,
        widget=forms.Select(
            attrs={
                }),
    )

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.helper = FormHelper()
    #     self.helper.add_input(Submit('submit', 'Submit'))