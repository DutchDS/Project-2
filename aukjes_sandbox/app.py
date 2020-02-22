# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)


app = Flask(__name__)

# from flask_sqlalchemy import SQLAlchemy

# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/pets.sqlite"
# # app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

# db = SQLAlchemy(app)

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

# @app.route("/api/pals")
# def pals():
#     results = db.session.query(Pet.name, Pet.lat, Pet.lon).all()

#     hover_text = [result[0] for result in results]
#     lat = [result[1] for result in results]
#     lon = [result[2] for result in results]

#     pet_data = [{
#         "type": "scattergeo",
#         "locationmode": "USA-states",
#         "lat": lat,
#         "lon": lon,
#         "text": hover_text,
#         "hoverinfo": "text",
#         "marker": {
#             "size": 50,
#             "line": {
#                 "color": "rgb(8,8,8)",
#                 "width": 1
#             },
#         }
#     }]

#     return jsonify(pet_data)

if __name__ == "__main__":
    app.run(debug=True)
