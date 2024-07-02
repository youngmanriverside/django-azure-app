from django import forms
from employee.models import *
from employer.models import *
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit

class plans_filter_form(forms.Form):

    def __init__(self, *args, **kwargs):
        super(plans_filter_form, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        # add id "query-type" to the field "type"
        self.fields['type'].widget.attrs['id'] = 'query-type'

    type = forms.ChoiceField(required=True,
                             widget=forms.RadioSelect,
                                label={
                                    
                                },
                             choices=[('民眾', '民眾'), ('雇主', '雇主')],
                             )

    employee = forms.ModelChoiceField(required=False,
                                      widget=forms.Select,
                                      label='登錄代號',
                                      queryset=Employee.objects.all().values_list('name', flat=True),
                                      )
    
    employer = forms.ModelChoiceField(required=False,
                                        widget=forms.Select,
                                        label='登錄代號',
                                        queryset=Employer.objects.all().values_list('name', flat=True),
                                        )

