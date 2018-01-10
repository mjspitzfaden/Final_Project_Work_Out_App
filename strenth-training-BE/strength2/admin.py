from django.contrib import admin

from strength2.models import WorkOutDataForm
from strength2.models import UserDataForm

@admin.register(WorkOutDataForm)
class WorkOutDataFormAdmin (admin.ModelAdmin):
    list_display = ('name', 'key',)

@admin.register(UserDataForm)
class UserDataFormAdmin (admin.ModelAdmin):
    list_display = ('Name', 'userName_id')
