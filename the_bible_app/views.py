from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import json

def send_the_index(req):
    the_index = open('static/index.html')
    return HttpResponse(the_index)

@api_view(["POST"])
def user_sign_up(request):
    # print(request.data)
    email = request.data['email']
    password = request.data['password']
    first_name = request.data['first_name']
    last_name = request.data['last_name']
    admin_super = False
    admin_staff = False
    if 'admin_super' in request.data:
        if request.data['admin_super'].lower() == "yes":
            admin_super = True
    if 'admin_staff' in request.data:
        if request.data['admin_staff'].lower() == "yes":
            admin_staff = True
    try: #object.create_user will hash password / object.create will make password plain text
        create_new_user = App_User.objects.create_user(
            username = email, 
            email = email, 
            first_name = first_name, 
            last_name = last_name, 
            password = password, 
            is_superuser = admin_super, 
            is_staff = admin_staff)
        create_new_user.save()
        return JsonResponse({"success" : True})
    except Exception as error:
        print(error)
        return JsonResponse({"success" : False})

@api_view(['POST'])
def user_sign_in(req):
    email = req.data['email']
    pWord = req.data['password']
    # print(req._request)
    # print(req.data)
    user = authenticate(username=email, password=pWord)
    if user is not None and user.is_active:
        try:
            login(req._request, user)
            return JsonResponse({"signin" : True})
        except Exception as error:
            print(error)
            return JsonResponse({"signin" : False})
    return JsonResponse({"signin" : False}) 

@api_view(["GET"])
def user_curr_user(req):
    if req.user.is_authenticated:
        # print(req.user)
        user_data = serialize("json", [req.user], fields=["first_name", "last_name", "email"])
        print(user_data) #json string
        user_data_processed = json.loads(user_data)
        print(user_data_processed[0]['fields']['first_name']) #json converted to Dictionary 
        return JsonResponse({"user_data" : user_data_processed[0]['fields'],
                             "pk" : user_data_processed[0]['pk']})
    else:
        return JsonResponse({"user_data" : None})


@api_view(["POST"])
def user_sign_out(req):
    try:
        logout(req)
        return JsonResponse({"signout" : True})
    except Exception as error:
        print(error)
        return JsonResponse({"signout" : False})

# def sampleHome (req):
#     return HttpResponse("<h1>sampleHome</h1>")

