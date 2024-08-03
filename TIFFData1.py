import requests
import json
import datetime
import filecmp
import random

import sys

old = False

url = "https://tiff.net/festivalfilmlist"
if len(sys.argv) == 2 and sys.argv[1] == '-old':
    old = True
    url = 'https://web.archive.org/web/20230925131719if_/https://tiff.net/festivalfilmlist'

r = requests.get(url)
info = r.json()

with_dates = []
screening_count = 0

for idx, movie in enumerate(info['items']):
    if len(movie['scheduleItems']) > 0:
        sched_items = movie['scheduleItems']
        reduced_sched = []
        for scr in sched_items:
            screening = {"time": scr['startTime'], 
                            "pressIndustry": scr['pressAndIndustry'],
                            "venue": scr['venue']['shortName'],}
            if len(scr['cost']) > 0:
                tier = scr['cost'][0]
                screening['tier'] = tier
            reduced_sched.append(screening)
            screening_count += 1
        with_dates.append({'title': movie['title'], 'number': idx, 
                           'scr': reduced_sched})

# for idx, movie in enumerate(info['items']):
#     with_dates.append(movie)

def slugify(str):
    return str.lower().replace(" ", "-")

theatres = {}
roomsCount = 0
rooms = info['rooms']
for roomName in info['rooms']:
    room = rooms[roomName]
    print(room)
    roomsCount += 1
    if room['name'] not in theatres:
        theatres[room['name']] = {"name" : room['name'], 
                                  "slug": slugify(room['name']), 
                                  "address": "350 King Street West, Toronto", 
                                  "auditoriums": [] }
    theatres[room['name']]['auditoriums'].append({"name": room['room'], "slug": slugify(room['shortName']), "capacity": random.randint(10, 500)})

print(f"Found {len(with_dates)} movies and {screening_count} screenings.")
print(f"Found {len(theatres.keys())} theatres and {roomsCount} rooms.")

try:
    with open("venues-2023.txt", "w") as fVenues:
        print(json.dumps(theatres, indent=2), file=fVenues)
except:
    print("Printing venues to file did not work.")

create = False
try :
    most_recent = open(f"{('old' if old else 'with_dates')}_data.txt", "r")
    recent_str = json.loads(most_recent.read())
    if recent_str == with_dates:
        print("No update. Will not export new file.")
    else:
        create = True
        

        dateHourTag = datetime.datetime.now().strftime("%m-%d-%H")
        f = open(f'with_dates_{dateHourTag}.txt', "w")
except :
    print("File is probably not there. Have to create.")
    create = True

if create:
    with open(f"{('old' if old else 'with_dates')}_data.txt", "w") as f3:
            print(json.dumps(with_dates, indent=2), file=f3)

# # parsed = json.loads(info['items'][0])
# with open(f'everything_{dateHourTag}', "w") as f2:
#     print(json.dumps(info['items'], indent=2), file = f2)
