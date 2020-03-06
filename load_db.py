#!/usr/bin/env python
# coding: utf-8

from bs4 import BeautifulSoup as bs
import requests 
import pymongo
import pandas as pd
import re
import os
import csv
import time
import json
import ast
import pprint
from datetime import datetime, timedelta
from sqlalchemy import create_engine

DATABASE_URI = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"
print(DATABASE_URI)

engine = create_engine(DATABASE_URI)
# connection_string = "postgres:postgres@localhost:5432/corona_db"

def create_geojson(date, df_merged):
    df_countries_by_day = df_merged[(df_merged.date==date)]
    df_data = df_countries_by_day.groupby(['country','country_2']).agg({'conf_count':'sum', 'cured_count':'sum', 'dead_count':'sum'}).reset_index()
    df_data = df_data.set_index('country')
                                              
    json_df = pd.read_json('static/world_geojsons/world.json', encoding='UTF-8')
    json_df_feat = pd.DataFrame(json_df.features)

    geo_string = ""

    for index, row in json_df_feat.iterrows():
#         print(row['features']['properties']['ADMIN'])
        # print(index)
        try:
            str_feat_1 = ("{\"type\": \"Feature\",")

            prop_name = row['features']['properties']['ADMIN']
            prop_american_name = df_data.loc[prop_name,"country_2"]
            prop_confirmedCount = df_data.loc[prop_name,"conf_count"]
            prop_suspectedCount = 0
            prop_curedCount = df_data.loc[prop_name,"cured_count"]
            prop_deadCount = df_data.loc[prop_name,"dead_count"]    
            prop_date = date

            str_prop_double_quotes = str(row['features']['properties'])
            str_prop_double_quotes = str_prop_double_quotes.replace("\'","\"")

            str_prop_1 = ("\"properties\" : " + str_prop_double_quotes + "\",")[:-3]
            str_prop_2 = (",\"american_name\" : \"" + prop_american_name + "\",")
            str_prop_3 = ("\"confirmedCount\" : \"" + str(prop_confirmedCount) + "\",")
            str_prop_4 = ("\"suspectedCount\" : \"" + str(prop_suspectedCount) + "\",")
            str_prop_5 = ("\"curedCount\" : \"" + str(prop_curedCount) + "\",")
            str_prop_6 = ("\"deadCount\" : \"" + str(prop_deadCount) + "\",")
            str_prop_7 = ("\"date\" : \"" + prop_date + "\"},")

            str_prop_all  = str_prop_1 + str_prop_2 + str_prop_3 + str_prop_4 + str_prop_5 + str_prop_6 + str_prop_7

            str_geom_1 = ("\"geometry\":" + str(row['features']['geometry']) + "},")
            str_geom_1 = str_geom_1.replace("\'","\"")

            str_for_each_province = (str_feat_1)+(str_prop_all)+(str_geom_1)
            geo_string = geo_string + (str_for_each_province)
        except:
            geo_string = geo_string
    
    pre_fix = "{\"type\": \"FeatureCollection\", \"features\": ["
    post_fix = "]}"

    total_string = pre_fix + geo_string[:-1] + post_fix

    output_path = os.path.join("static/world_geojsons", date + ".json")
    with open(output_path, "w", encoding='UTF-8') as text_file:
        text_file.write(total_string)
        text_file.close()

def save_world_to_database(df_world):
    # connection_string = "postgres:postgres@localhost:5432/corona_db"
    # engine = create_engine(f'postgresql://{connection_string}')
    df_world.to_sql(name='daily_stats_world', con=engine, if_exists='append', index=False)

def load_new():

    confirmed_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv'
    df_confirmed = pd.read_csv(confirmed_url)
    cured_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
    df_cured = pd.read_csv(cured_url)
    death_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv'
    df_death = pd.read_csv(death_url)

    df_confirmed_long = df_confirmed.melt(id_vars=["Province/State", "Country/Region","Lat","Long"], 
            var_name="Date", 
            value_name="Value")
    df_confirmed_long.head()
    output_path = os.path.join("static/world_data", "df_world_confirmed_original.csv")
    df_confirmed.to_csv(output_path)

    df_cured_long = df_cured.melt(id_vars=["Province/State", "Country/Region","Lat","Long"], 
            var_name="Date", 
            value_name="Value")
    df_cured_long.head()
    output_path = os.path.join("static/world_data", "df_world_cured_original.csv")
    df_cured.to_csv(output_path)

    df_death_long = df_death.melt(id_vars=["Province/State", "Country/Region","Lat","Long"], 
            var_name="Date", 
            value_name="Value")

    output_path = os.path.join("static/world_data", "df_world_death_original.csv")
    df_death.to_csv(output_path)

    df_confirmed_long["new_date"] = pd.to_datetime(df_confirmed_long['Date'])

    df_confirmed_long["Province/State"].fillna(df_confirmed_long["Country/Region"], inplace=True)
    df_confirmed_long = df_confirmed_long.rename(columns={"Province/State":"american_name", "Country/Region":"country", "Lat":"lat","Long":"long", "Date":"date", "Value": "conf_count"})

    df_cured_long["Province/State"].fillna(df_cured_long["Country/Region"], inplace=True)
    df_cured_long = df_cured_long.rename(columns={"Province/State":"american_name", "Country/Region":"country", "Lat":"lat","Long":"long","Date":"date", "Value": "cured_count"})

    df_death_long["Province/State"].fillna(df_death_long["Country/Region"], inplace=True)
    df_death_long = df_death_long.rename(columns={"Province/State":"american_name", "Country/Region":"country", "Lat":"lat","Long":"long","Date":"date", "Value": "dead_count"})

    df_confirmed_long.loc[(df_confirmed_long.country == 'Mainland China'),'country']='China'
    df_confirmed_long.loc[(df_confirmed_long.country == 'US'),'country']='United States of America'
    df_confirmed_long = df_confirmed_long.set_index(['date', 'american_name'])

    df_cured_long.loc[(df_cured_long.country == 'Mainland China'),'country']='China'
    df_cured_long.loc[(df_cured_long.country == 'US'),'country']='United States of America'
    df_cured_long = df_cured_long.set_index(['date', 'american_name'])

    df_death_long.loc[(df_death_long.country == 'Mainland China'),'country']='China'
    df_death_long.loc[(df_death_long.country == 'US'),'country']='United States of America'
    df_death_long = df_death_long.set_index(['date', 'american_name'])

    query_str = open('static/sql/world_max_date.sql')
    query_text = ""
    for text in query_str:
        query_text = query_text + text

    # connection_string = "postgres:postgres@localhost:5432/corona_db"
    # engine = create_engine(f'postgresql://{connection_string}')
    # connection = engine.connect()
    rs = engine.execute(query_text)

    # rs = connection.execute(query_text)
    for i in rs:
        last_date = (i[0])
    print(last_date)
    # connection.close()

    df_merged = pd.merge(df_confirmed_long, df_cured_long, how='left', on=['date', 'american_name', 'country','lat','long'])

    df_merged = pd.merge(df_merged, df_death_long,how='left', on=['date', 'american_name', 'country','lat','long'])
    df_merged = df_merged.reset_index()
    df_merged = df_merged.drop(['date'], axis=1)
    df_merged['country_2'] = df_merged['country']

    df_merged = df_merged.rename(columns={"new_date":"date"})

    df_merged_new = df_merged[df_merged['date'] > last_date]

    output_path = os.path.join("static/world_data", "df_world_new.csv")
    df_merged_new.to_csv(output_path)
    df_merged_new = df_merged_new[df_merged['conf_count']!=0]

    current_date = datetime.now()
    print("Current Date ",current_date)
    yesterday = current_date+ timedelta(days=0)
    print("Yesterday: ",yesterday)

    start_date = datetime.strptime(last_date, "%Y-%m-%d")
    print("Start Date", start_date)

    while yesterday > start_date:
        pass_date = start_date.strftime("%Y-%m-%d")
        print(pass_date)
        create_geojson(pass_date, df_merged)
        start_date = start_date + timedelta(days=1)

    url_world = "static/world_data/df_world_new.csv"
    df_world = pd.read_csv(url_world)
    df_world = df_world.drop(['country_2'], axis=1)
    df_world.head()
    
    save_world_to_database(df_world)

    query_str = open('static/sql/world_top_10.sql')
    query_text = ""
    for text in query_str:
        query_text = query_text + text

    # connection_string = "postgres:postgres@localhost:5432/corona_db"
    # engine = create_engine(f'postgresql://{connection_string}')    

    df_query = pd.read_sql_query(query_text, con=engine)
    print(df_query.head())