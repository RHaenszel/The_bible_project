"""
the_bible_app urls.py
    
"""

from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_index, name='index'),
    path('signup/', views.user_sign_up, name='signup'),
    path('signin/', views.user_sign_in, name='signin'),
    path('currentuser/', views.user_curr_user, name='currentuser'),
    path('signout/', views.user_sign_out, name= 'signout'),
    
]
