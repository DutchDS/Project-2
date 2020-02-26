# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import pandas as pd
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
import decimal
import flask.json

app = Flask(__name__)

DATABASE_URI = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"
print(DATABASE_URI)
# connection_string = "postgres:postgres@localhost:5432/corona_db"
# connection_string = 'jhmhjoanyrfkil:9cd0395b06b90f91ed2ea452bb2049b1d69921df39d0dbcfe18b54543f5e5e2c@ec2-50-17-178-87.compute-1.amazonaws.com:5432/decdba37fkfjcs'
engine = create_engine(DATABASE_URI)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI 

db = SQLAlchemy(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"

# db = SQLAlchemy(app)

@app.route("/")
def home(): 
    mars_data = ['aukje', 'jim', 'vamsi','meliha']
    return render_template("china.html", mars_data=mars_data)

@app.route("/api/bar_china")
def bar_chart_china():
    
    connection_string = "postgres:postgres@localhost:5432/corona_db"
    engine = create_engine(f'postgresql://{connection_string}')
    # Read
    result_set = []
    result_set = engine.execute("select date, \
        sum(conf_count) confirmed, \
        sum(cured_count) cured, \
        sum(dead_count) dead, \
        sum(susp_count) suspected \
        from daily_stats \
        group by date \
        order by date")  

    
    all_results = []
    for date, conf_count, cured_count, dead_count, susp_count in result_set:
        results_dict = {}
        results_dict["date"] = date
        results_dict["conf_count"] = conf_count
        results_dict["cured_count"] = cured_count
        results_dict["dead_count"] = dead_count
        results_dict["susp_count"] = susp_count
        all_results.append(results_dict)

    return jsonify(all_results)

@app.route("/world")
def world():
    mars_data = ['this', 'is', 'the','world']
    return render_template("world.html", mars_data=mars_data)

if __name__ == "__main__":
    app.run(debug=True)
####################################
# OLD WAY OF RETRIEVING JSON FILE
#####################################
# @app.route("/api/bar_china/file.json")
# def bar_china():

#     connection_string = "postgres:postgres@localhost:5432/corona_db"
#     engine = create_engine(f'postgresql://{connection_string}')

#     query_str = open('static/sql/test_query.sql')
#     query_text = ""
#     for text in query_str:
#         query_text = query_text + text
        
#     print(query_text)

#     df_query = pd.read_sql_query(query_text, con=engine)
#     bar_data = df_query.to_json()
#     return bar_data


