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

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/pets.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "postgresql://postgres:postgres@localhost:5432/corona_db"

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

db = SQLAlchemy(app)

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    
    # Find one record of data from the mongo database
    # mars_data = mongo.db.mars_collection.find_one()
    mars_data = ['aukje', 'jim', 'vamsi','meliha']
    # Return template and data
    return render_template("china.html", mars_data=mars_data)


# Route that will trigger the scrape function
# @app.route("/scrape")
# def scrape():

#     # Run the scrape function
#     # mars_data = scrape_mars.scrape()
#     # results = db.session.query(daily_stats.date, daily_stats.confirmed).all()
#     # Update the Mongo database using update and upsert=True
#     # mongo.db.mars_collection.update({}, mars_data, upsert=True)

#     # Redirect back to home page
#     # return redirect("/")
#     return jsonify(results)

@app.route("/api/bar_china/file.json")
def bar_china():

    connection_string = "postgres:postgres@localhost:5432/corona_db"
    engine = create_engine(f'postgresql://{connection_string}')

    query_str = open('static/sql/test_query.sql')
    query_text = ""
    for text in query_str:
        query_text = query_text + text
        
    print(query_text)

    df_query = pd.read_sql_query(query_text, con=engine)
    bar_data = df_query.to_json()
    return bar_data

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


if __name__ == "__main__":
    app.run(debug=True)
