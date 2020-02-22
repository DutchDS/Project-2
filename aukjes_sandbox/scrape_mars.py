#######################################################################
### Initialize modules/libraries
#######################################################################

from bs4 import BeautifulSoup as bs
from splinter import Browser

import requests 
import pymongo
import pandas as pd
import re

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "chromedriver"}
    return Browser("chrome", **executable_path, headless=True)


def scrape():
    browser = init_browser()

    #######################################################################
    ### NASA Mars News ###
    #######################################################################

    url_mars = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
    browser.visit(url_mars)

    html = browser.html
    soup = bs(html, 'html.parser')

    # Iterate through each article found
    # Tried this as well: response = requests.get(url_mars)
    # But unles JavaScript is turned of for this website, 'press release' articles show up first, not the latest one (discussed with John and Bobby)

    try:
        news_body = "Temporarily Not available. Please scrape again!"
        news_title = soup.find('div', class_='content_title').text
        news_body = soup.find('div', class_='article_teaser_body').text

        print("news_title: " + news_title)
        print("news_p: " + news_body)
    except:
        print("oops")

    #######################################################################
    ### FEATURED IMAGE ###
    #######################################################################

    # URL of page to be scraped
    url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'

    # Retrieve page with the requests module
    response = requests.get(url)
    soup = bs(response.text, 'html.parser')

    space_image = soup.article.a['data-fancybox-href']
    print("Largest Image found: " + space_image)

    # unless the background image is needed:
    space_image_background = soup.article['style']

    split_str = str.split(space_image_background, ' url(\'')
    split_str = split_str[1]
    split_str = str.split(split_str,')\'')
    space_image_background = split_str[0]

    print("Background image found: " + space_image_background)

    #This may have changed in the mean time... only a mediumsize jpg on website
    featured_image_url = 'https://www.jpl.nasa.gov' + space_image
    print("featured_image_url: " + featured_image_url)

    #######################################################################
    ### Mars Weather ###
    #######################################################################

    browser = init_browser()

    # URL of page to be scraped
    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
    html = browser.html
    soup = bs(html, 'html.parser')
    try:
        mars_weather = soup.find('p', class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text
        mars_weather = mars_weather.split("https")[0]
    except:
        mars_weather = "Temporarily not available. Please scrape again!"
    print("mars_weather: " + mars_weather)

    #######################################################################
    ### Mars Facts ###
    #######################################################################

    url = 'https://space-facts.com/mars/'
    tables = pd.read_html(url)
    facts = pd.DataFrame(tables[0])
    facts.columns = ['Mars Profile:','']
    facts = facts.set_index('Mars Profile:')
    print("Mars Facts:")
    print(facts)

    #######################################################################
    ### Mars Hemispheres ###
    #######################################################################

    browser = init_browser()

    url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url)

    html = browser.html
    soup = bs(html, 'html.parser')

    # Find all links to clicked to obtain large image
    results = soup.find_all('a', class_='itemLink product-item')
    collection = []
    for r in results:
        if r.h3:
    #         print(r['href'])
            url = "https://astrogeology.usgs.gov" + r['href']
            collection.append(url)

    # for each item in collections - find the large image by viewing the href. Then append to image list.

    image_list = []
    image_dict = {}

    for c in collection:
        print("Now processing: " + c)
        browser.visit(c)
        
        html = browser.html
        soup = bs(html, 'html.parser')
        
        image_url = soup.li.a['href']
        title = soup.h2.text
    
        image_dict = {'hem_titel':title , 'hem_image_url':image_url}
        image_list.append(image_dict)
        
        browser.back

    print("Image List:")
    print(image_list)

    mars_data = {}

    mars_data['news_title'] = news_title
    mars_data['news_body'] = news_body
    mars_data['featured_image_url'] = featured_image_url
    mars_data['mars_weather'] = mars_weather
    mars_data['mars_facts_url'] = 'mars_facts.html'
    mars_data['image_list'] = image_list
    
    print("Mars Dictionary: ")
    print(mars_data)

    return mars_data

