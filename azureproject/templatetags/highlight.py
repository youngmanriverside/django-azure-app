from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter(name='highlight')

def highlight(content, text):
    highlighted = content.replace(text, f'<a href="#helper-header" class="wda-link">{text}</a>')

    return mark_safe(highlighted)