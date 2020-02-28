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
<<<<<<< HEAD:Old files/app working just china.py
=======
import decimal
import flask.json
>>>>>>> eca623a7c991caf93a258708fbb78b4aad4c1518:aukjes_sandbox/app.py

app = Flask(__name__)

DATABASE_URI = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"
print(DATABASE_URI)

<<<<<<< HEAD:Old files/app working just china.py
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/pets.sqlite"
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')
DATABASE_URI = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"
print(DATABASE_URI)
# connection_string = "postgres:postgres@localhost:5432/corona_db"
# connection_string = 'jhmhjoanyrfkil:9cd0395b06b90f91ed2ea452bb2049b1d69921df39d0dbcfe18b54543f5e5e2c@ec2-50-17-178-87.compute-1.amazonaws.com:5432/decdba37fkfjcs'
engine = create_engine(DATABASE_URI)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI 

db = SQLAlchemy(app)
=======
engine = create_engine(DATABASE_URI)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI 

db = SQLAlchemy(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"

# db = SQLAlchemy(app)
@app.route("/")
def world():
    result_set = []
    
    query_str = open('static/sql/world_top_10.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text
        
    result_set = engine.execute(query_text)

    result_sum = []
>>>>>>> eca623a7c991caf93a258708fbb78b4aad4c1518:aukjes_sandbox/app.py

    query_str = open('static/sql/world_summary.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text

    result_sum = engine.execute(query_text)
  
    return render_template("world.html", world_facts=result_set, world_sum=result_sum)

@app.route("/china")
def china(): 
    result_set = []
    
    query_str = open('static/sql/china_top_10.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text
        
    result_set = engine.execute(query_text)

    result_sum = []

    query_str = open('static/sql/china_summary.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text

    result_sum = engine.execute(query_text)
  
    return render_template("china.html", china_facts=result_set, china_sum=result_sum)

@app.route("/slider")
def slider(): 
    return render_template("slider.html")

@app.route("/news")
def news():
    return render_template("news.html")

<<<<<<< HEAD:Old files/app working just china.py
    # connection_string = "postgres:postgres@localhost:5432/corona_db"
    # engine = create_engine(f'postgresql://{connection_string}')
=======
@app.route("/api/bar_china")
def bar_chart_china():
    
    
    result_set = []
    
    query_str = open('static/sql/china_bar.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text
        
    result_set = engine.execute(query_text)
    
    all_results = []
    for date, conf_count, cured_count, dead_count, susp_count in result_set:
        results_dict = {}
        results_dict["date"] = date
        results_dict["conf_count"] = conf_count
        results_dict["cured_count"] = cured_count
        results_dict["dead_count"] = dead_count
        results_dict["susp_count"] = susp_count
        all_results.append(results_dict)
>>>>>>> eca623a7c991caf93a258708fbb78b4aad4c1518:aukjes_sandbox/app.py

    return jsonify(all_results)

@app.route("/api/bar_world")
def bar_chart_world():
    
    result_set = []
    
    query_str = open('static/sql/world_bar.sql')
    query_text = ""
    
    for text in query_str:
        query_text = query_text + text
        
<<<<<<< HEAD:Old files/app working just china.py
    print(query_text)
    df_query = pd.read_sql_query(query_text, con=engine)
    # df_query = pd.read_sql_query(query_text, con=db)

    bar_data = df_query.to_json()
    return bar_data
=======
    result_set = engine.execute(query_text)
    
    all_results = []
    for date, country, conf_count, cured_count, dead_count in result_set:
        results_dict = {}
        results_dict["date"] = date
        results_dict["country"] = country
        results_dict["conf_count"] = conf_count
        results_dict["cured_count"] = cured_count
        results_dict["dead_count"] = dead_count
        all_results.append(results_dict)

    return jsonify(all_results)
>>>>>>> eca623a7c991caf93a258708fbb78b4aad4c1518:aukjes_sandbox/app.py


# @app.route("/api/data/test")
# def list_test():
#     results = db.session.query(daily_stats.date).all()

#     dates = []
#     for result in results:
#         dates.append({
#             "date": result[0]
#         })
#     return jsonify(dates)

if __name__ == "__main__":
    app.run(debug=True)
