from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout, Field
from .models import *
from .choice import *

class employerForm(forms.ModelForm):
    class Meta:
        model = Employer
        fields = '__all__'

    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                }),
        label='單位名稱')
    
    organization = forms.ChoiceField(
        choices=choice_organization,
        widget=forms.RadioSelect(),
        label='單位類型', )

    employment_insurance = forms.ChoiceField(
        choices=choice_insurance,
        widget=forms.RadioSelect(
            attrs={
                }),
        label='是否為就保單位')
    
    subsidy_requirement = forms.ChoiceField(
        choices=choice_subsidy,
        widget=forms.RadioSelect(
            attrs={
                }),
        label='補助需求項目')

    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            # Set all fields css_class to form-label
            Field('name', css_class='form-label'),
            Field('organization', css_class='form-label'),
            Field('employment_insurance', css_class='form-label'),
            Field('subsidy_requirement', css_class='form-label'),
        )
    
    