from django.contrib import admin

from strength2.models import WorkOutDataForm

@admin.register(WorkOutDataForm)
class WorkOutDataFormAdmin (admin.ModelAdmin):
    list_display = ('name', 'key')
