#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import os
import time
import json
import pprint
from datetime import datetime, timedelta
from sqlalchemy import create_engine

# from bs4 import BeautifulSoup as bs
# import requests 
# import pymongo
# import re
# import csv
# import ast
# from pandas.io.json import json_normalize


# In[2]:


def file_not_empty(filepath) :
#     """ Check if file is empty by confirming if its size is 0 bytes"""
    # Check if file exist and it is not empty
    return os.path.isfile(filepath) and os.path.getsize(filepath) > 0


# In[3]:


def processNewsFiles() :
    rootdir = "../static/newsdata"
    
    big_df = pd.DataFrame()
    for subdir, dirs, files in os.walk(rootdir):
        for file in files :
            filepath = os.path.join(subdir, file)
            if (file == "newsapi_sources.json") :
                print(f'skipping {filepath}')
                
            elif (subdir == "../static/newsdata\samples") :
                print(f'skipping {filepath}')
            
            elif file_not_empty(filepath) :
                print(filepath)
                
                with open(filepath) as f:
                    jsondata = json.load(f)
                
                if len(jsondata['articles']) != 0:
                    df = pd.DataFrame(jsondata['articles'])

                    darray= []
                    for source in df.source:
                        darray.append(source)

                    sourcedf = pd.DataFrame(darray)

                    df = pd.concat([sourcedf, df], axis=1)
                    df.rename(columns={'id': 'src_id', 'name': 'src_name'}, inplace=True)
                    df.drop('source', 1, inplace=True)

                    if (big_df.empty) :
                        big_df = df.copy()
                    else : 
                        big_df = big_df.append(df, ignore_index=True)
#             print(f"big_df shape: {big_df.shape}")

    return big_df


# In[4]:


def save_to_database(persist_df):
    connection_string = "postgres:postgres@localhost:5432/corona_db"
    engine = create_engine(f'postgresql://{connection_string}')

    persist_df.to_sql(name='news', con=engine, if_exists='replace', index=False)


# In[5]:


news_df = processNewsFiles()


# In[6]:


news_df.shape


# In[7]:


news_df.head()


# In[8]:


save_to_database(news_df)


# In[ ]:





# In[9]:


# with open('../static/newsdata/2020-01-24/al-jazeera-english_2020-01-24.json') as f:
#   data = json.load(f)

# # print(data['articles'])


# In[10]:


# # print(data['articles'])

# # df = pd.read_json(r'../static/newsdata\2020-01-24\al-jazeera-english_2020-01-24.json')
# # df.head()

# # df = json_normalize(data)
# # df.head()

# df = pd.DataFrame(data['articles'])
# df.head()

   


# In[11]:


# # dfsid = pd.DataFrame([df.source])
# # dfsid.head()
# darray= []
# for source in df.source:
#     darray.append(source)
    
# sourcedf = pd.DataFrame(darray)
# sourcedf.head()


# In[12]:


# dat1 = pd.concat([sourcedf, df], axis=1)
# dat1.rename(columns={'id': 'src_id', 'name': 'src_name'}, inplace=True)
# dat1.drop('source', 1, inplace=True)
# dat1.head()


# In[13]:


# big_df = pd.DataFrame()
# big_df = dat1
# # big_df.append(dat1, ignore_index=True) 
# big_df


# In[14]:


# big_df = big_df.append(dat1, ignore_index=True) 
# big_df

