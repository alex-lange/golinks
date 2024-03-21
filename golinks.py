from flask import Flask, redirect
import json

app = Flask(__name__)

with open("./links.json") as f:
    links_from_file = json.load(f)

# Support making the hyphens optional for paths that have them
# e.g. go/abc-def and go/abcdef will redirect to the same place
links =  links_from_file | { l.replace("-", ""): links_from_file[l] for l in links_from_file.keys() if l.find("-") != -1 }

@app.route("/<path:path>")
def go(path):
    print("Redirecting to ", links[path]['url'])
    return redirect(links[path]['url'])
