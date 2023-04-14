"""
the_bible_app urls.py
    
"""

from django.urls import path
from . import views
from . import bibleapi

urlpatterns = [
    path('', views.send_the_index, name='index'),
    path('signup/', views.user_sign_up, name='signup'),
    path('signin/', views.user_sign_in, name='signin'),
    path('currentuser/', views.user_curr_user, name='currentuser'),
    path('signout/', views.user_sign_out, name= 'signout'),
    path('passages/', bibleapi.passage_from_Bible),
    path('search/', bibleapi.search_Bible),
    path('journaldata/', bibleapi.journal_Bible)
]
