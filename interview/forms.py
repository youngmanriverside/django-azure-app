from django import forms

class UploadVideoForm(forms.Form):
    video_file = forms.FileField(label='Select a video file')