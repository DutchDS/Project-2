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

engine = create_engine(DATABASE_URI)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI 

db = SQLAlchemy(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"

# db = SQLAlchemy(app)
@app.route("/")
def world():
    result_set = []
    result_set = engine.execute("select  \
	    country, \
	    max(date), \
	    sum(conf_count) confirmed, \
	    sum(cured_count) cured, \
	    sum(dead_count) dead, \
	    (sum(conf_count) + sum(cured_count) + sum(dead_count)) total \
        from daily_stats_world \
        where date = (select max(date ) from daily_stats_world) \
        group by country \
        order by total desc \
        limit 10")

    result_sum = []
    result_sum = engine.execute("select  max(date), \
	    sum(conf_count) confirmed, \
	    sum(cured_count) cured, \
	    sum(dead_count) dead, \
		(sum(conf_count) + sum(cured_count) + sum(dead_count)) total \
        from daily_stats_world  \
        where date = (select max(date ) from daily_stats_world)") 

    # for i in result_sum:
    #     pct_conf = round(i[1]/i[4]*100)
    #     pct_cured = round(i[2]/i[4]*100)
    #     pct_dead = round(i[3]/i[4]*100)
    #     print(pct_conf)
    #     print(pct_cured)
    #     print(pct_dead)
  
    return render_template("world.html", world_facts=result_set, world_sum=result_sum)

@app.route("/china")
def china(): 
    return render_template("china.html")

@app.route("/slider")
def slider(): 
    return render_template("slider.html")

@app.route("/news")
def news():
    return render_template("news.html")

@app.route("/api/bar_china")
def bar_chart_china():
    
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

@app.route("/api/bar_world")
def bar_chart_world():
    
    result_set = []
    result_set = engine.execute("select date, \
	sum(conf_count) confirmed, \
	sum(cured_count) cured, \
	sum(dead_count) dead \
    from daily_stats_world \
    where country <> 'China' \
    group by date\
    order by date")  

    
    all_results = []
    for date, conf_count, cured_count, dead_count in result_set:
        results_dict = {}
        results_dict["date"] = date
        results_dict["conf_count"] = conf_count
        results_dict["cured_count"] = cured_count
        results_dict["dead_count"] = dead_count
        all_results.append(results_dict)

    return jsonify(all_results)

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


