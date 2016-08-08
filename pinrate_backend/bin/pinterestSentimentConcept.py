import sys

comments = sys.argv[1]
import json
import re
import requests
from bs4 import BeautifulSoup
from nltk.stem.porter import PorterStemmer
from textblob import TextBlob


# Stem the comments
stemmer = PorterStemmer()

tb = TextBlob(comments)
score = (tb.polarity + 1) / 2 * 5

sys.stdout.write(str(score))