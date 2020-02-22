# https://newsapi.org/docs/client-libraries/python

# Installation
# $ pip install newsapi-python

# Usage
from newsapi import NewsApiClient

# Init
newsapi = NewsApiClient(api_key='17189260d63f458ca3a7b53161be8b0a')

# /v2/top-headlines
top_headlines = newsapi.get_top_headlines(q='coronavirus',
                                        from_param='2017-12-01',
                                        to='2017-12-12',
                                        language='en',
                                        country='us')

# # /v2/everything
# all_articles = newsapi.get_everything(q='bitcoin',
#                                       sources='bbc-news,the-verge',
#                                       domains='bbc.co.uk,techcrunch.com',
#                                       from_param='2017-12-01',
#                                       to='2017-12-12',
#                                       language='en',
#                                       sort_by='relevancy',
#                                       page=2)

# /v2/sources
sources = newsapi.get_sources()
