from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Submit, Layout
from crispy_forms.bootstrap import StrictButton
from .models import *
from .choices import *

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['name', 'gender', 'age', 'unemployment_duration']

    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                }),
        label='姓名')
    
    gender = forms.ChoiceField(
        choices=choices_gender,
        widget=forms.RadioSelect(
            attrs={
                }),
        label='性別')

    age = forms.IntegerField(
        widget=forms.NumberInput(
            attrs={
                }),
        label='年齡')
    
    unemployment_duration = forms.ChoiceField(
        choices=choices_unemployment_duration,
        widget=forms.RadioSelect(
            attrs={
                }),
        label='失業週期')
    
    current_status = forms.MultipleChoiceField(
        choices=choices_current,
        widget=forms.CheckboxSelectMultiple(
            attrs={
                }),
        label='就業狀況')
    
    identity = forms.MultipleChoiceField(
        choices=choices_identity,
        widget=forms.CheckboxSelectMultiple(
            attrs={
                }),
        label='身份別')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
    
# class IdentityForm(forms.ModelForm):
#     class Meta:
#         model = Employee_identity
#         fields = ['identity']

#     identity = forms.MultipleChoiceField(
#         choices=choices_identity,
#         widget=forms.CheckboxSelectMultiple(
#             attrs={
#                 'class': 'px-3 py-3 text-lg'
#                 }),
#         label='特殊身份別')
    
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_tag = False

# class CurrentForm(forms.ModelForm):
#     class Meta:
#         model = Employee_current
#         fields = ['current']

#     current = forms.MultipleChoiceField(
#         choices=choices_current,
#         widget=forms.CheckboxSelectMultiple(
#             attrs={
#                 'class': 'px-3 py-3 text-lg'
#                 }),
#         label='就業狀況')
    
#     def __init__(self, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.helper = FormHelper()
#         self.helper.form_tag = False
    