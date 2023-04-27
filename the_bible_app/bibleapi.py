from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from .models import *
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
import requests, time, json
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.environ['API_KEY']
ESV_API_KEY = os.environ['ESV_API_KEY']

def audio(req):
    book = req.GET['book']
    chapter = req.GET['chapter']
    start = req.GET['start']
    end = req.GET['end']
    print(book, chapter, start, end)
    headers = {
    'Authorization': f"Token {ESV_API_KEY}",
    }

    response = requests.get(f"https://api.esv.org/v3/passage/audio/?q={book}+{chapter}:{start}-{end}", headers=headers)
    # print(response.content)
    open("audio.mp3", "wb").write(response.content)
    f = open("audio.mp3","rb") 
    response2 = HttpResponse()
    response2.write(f.read())
    response2['Content-Type'] ='audio/mp3'
    response2['Content-Length'] =os.path.getsize("audio.mp3")
    return response2
    # return response.content



@api_view(["POST", 'GET'])
def journal_Bible(req):
    if req.method == "POST":
        try:
            print('POST')
            print(req.data)
            print(req.user)
            title = req.data['journalTitle']
            name_bible = req.data['bibleBook']['name_bible']
            book = req.data['bibleBook']['book']
            chapter = req.data['bibleBook']['chapter']
            start = req.data['bibleBook']['start']
            end = req.data['bibleBook']['end']
            journal_entry = req.data['journalEntry']
            if "id" in req.data['bibleBook'].keys() and req.data['bibleBook']['id'] != None:
                print("Update Entry")
                print("ID IS THERE", req.data['bibleBook']['id'])
                if req.data['deleteFlag']:
                    # print("Delete path")
                    print("Delete Path ID", req.data['bibleBook']['id'])
                    rec_id = req.data['bibleBook']['id']
                    record = Bible_Journals.objects.get(id=rec_id)
                    record.delete()
                    return JsonResponse({'success': True})
                else:    
                    print("UPDATE PATH")
                    rec_id = req.data['bibleBook']['id']
                    record = Bible_Journals.objects.get(id=rec_id)
                    record.title = title
                    record.journal_entry = journal_entry
                    record.save()
                    return JsonResponse({'success': True, "id" : rec_id})
            else:
                print("New Entry")
                new_entry = Bible_Journals.objects.create(user_fk=req.user, title=title, name_bible=name_bible, book=book, chapter=chapter, start=start, end=end, journal_entry=journal_entry )
                print("After Save ID:", new_entry.id)
                saved_id = new_entry.id
                new_entry.save()
            return JsonResponse({'success': True, "id" : saved_id})
        except Exception as error:
            print("This is the Error:", error)
            return JsonResponse({'success': False})
    elif req.method == "GET":
        print('GET')
        try:
            time.sleep(1)
            entries = list(Bible_Journals.objects.filter(user_fk=req.user).values())
            # print(entries)
            return JsonResponse({'entries': entries})
        except Exception as error:
            print(error)
            return JsonResponse({'success': False})
    return JsonResponse({'success': False})   

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
    try:
        if req.method == "POST":
            print("YES", req.data)
            name_Bible = req.data['name_bible']
            book = req.data['book']
            chapter = req.data['chapter']
            start = req.data['start']
            end = req.data['end']
        if start < 1:
            start = 1
            
        url = f"https://b4.dbt.io/api/bibles/filesets/{name_Bible}/{book}/{chapter}?verse_start={start}&verse_end={end}&v=4&key={API_KEY}"

        url2 = f"https://b4.dbt.io/api/bibles/filesets/{name_Bible}/{book}/{chapter}?v=4&key={API_KEY}"
        
        payload={}
        headers = {}

        response = requests.request("GET", url, headers=headers, data=payload)
        response2 = requests.request("GET", url2, headers=headers, data=payload)
        # print("Response2: ", response2.json())
        info2 = response2.json()
        newdata2 = info2['data']
        # print("NEWDATA2: ", newdata2)
        chapter_last_verse = newdata2[-1]['verse_end']
        # print("ChapterLastVerse", chapter_last_verse)
        
        info = response.json()
        newdata = info['data']
        length_of_newdata = len(newdata) - 1
        last_verse_number = newdata[length_of_newdata]['verse_end']
        if last_verse_number > chapter_last_verse:
            last_verse_number = chapter_last_verse
        start_verse_number = newdata[0]['verse_start']
        return JsonResponse({'newdata': newdata, 'start_verse_number': start_verse_number, 'last_verse_number': last_verse_number, 'book': book, 'start': start, 'end': last_verse_number, 'chapter': chapter, 'name_Bible': name_Bible, 'chapter_last_verse' : chapter_last_verse})
    except:
        
        print("NO")
        name_Bible = "ENGESV"
        book = "LUK"
        chapter = 1
        start = 1
        end = 4
        
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