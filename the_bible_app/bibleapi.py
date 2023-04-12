from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import requests
import logging
import json
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.environ['API_KEY']


@api_view(["POST"])
def search_Bible(req):
    
    print(req.data)
    
    if req.data['search_term']:
        print("first IF")
        if req.data['search_term']:
            print("Second IF")
            search_term = req.data['search_term']
        else:
            search_term = 'Jesus'
        
    else:
        
        # name_Bible = 'ENGESV'
        # book = 'MAT'
        search_term = "Jesus"
    print("Search Term: ", search_term)
    books_old = "GEN,EXO,LEV,NUM,DEU,JOS,JDG,RUT,1SA,2SA,1KI,2KI,1CH,2CH,EZR,NEH,EST,JOB,PSA,PRO,ECC,SNG,ISA,JER,LAM,EZK,DAN,HOS,JOL,AMO,OBA,JON,MIC,NAM,HAB,ZEP,HAG,ZEC,MAL"
    books_new = "MAT,MRK,LUK,JHN,ACT,ROM,1CO,2CO,GAL,EPH,PHP,COL,1TH,2TH,1TI,2TI,TIT,PHM,HEB,JAS,1PE,2PE,1JN,2JN,3JN,JUD,REV"
    
    url = f"https://b4.dbt.io/api/search?query={search_term}&fileset_id=ENGESV&limit=30&page=1&books={books_old},{books_new}&v=4&key={API_KEY}"

    payload={}
    headers = {}
    try:
        response = requests.request("GET", url, headers=headers, data=payload)

        info = response.json()
        newdata = info['verses']['data']
        # length_of_newdata = len(newdata) - 1
        # last_verse_number = newdata[length_of_newdata]['verse_end']
        return JsonResponse({'newdata': newdata})
        # return render(req, 'search.html', {'newdata': newdata} )
    except Exception as error:
        print(error)
        return JsonResponse({'newdata': None})
    
@api_view(["POST"])
def passage_from_Bible(req):
    
    # {'name_bible': 'ENGESV', 'book': 'MAT', 'chapter': 2, 'start': 4, 'end': 10}
    if req.method == "POST":
        print("YES", req.data)
        name_Bible = req.data['name_bible']
        book = req.data['book']
        chapter = req.data['chapter']
        start = req.data['start']
        end = req.data['end']
    
    url = f"https://b4.dbt.io/api/bibles/filesets/{name_Bible}/{book}/{chapter}?verse_start={start}&verse_end={end}&v=4&key={API_KEY}"

    payload={}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    
    info = response.json()
    newdata = info['data']
    length_of_newdata = len(newdata) - 1
    last_verse_number = newdata[length_of_newdata]['verse_end']
    start_verse_number = newdata[0]['verse_start']
    return JsonResponse({'newdata': newdata, 'start_verse_number': start_verse_number, 'last_verse_number': last_verse_number, 'book': book, 'start': start, 'end': end, 'chapter': chapter, 'name_Bible': name_Bible})

