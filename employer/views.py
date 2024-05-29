from django.shortcuts import render, HttpResponseRedirect
from .forms import employerForm

# Create your views here.
def employer(request):
    if request.method == 'POST':
        form_employer = employerForm(request.POST)
        if form_employer.is_valid():
            print("Form is valid")
            form_employer.save()
        
        return HttpResponseRedirect('applicants')

    form_employer = employerForm()

    context = {
        'form_employer': form_employer,
    }

    return render(request, 'formEmployer.html', context)