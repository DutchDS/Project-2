data = [{'Date': 'December 31, 2019',
'Comment': ' Cases of pneumonia detected in Wuhan, China, are first reported to the WHO. During this reported period, the virus is unknown. The cases occur between December 12 and December 29, according to Wuhan Municipal Health.'},
{'Date': 'January 1, 2020',
'Comment': ' Chinese health authorities close the Huanan Seafood Wholesale Market after it is discovered that wild animals sold there may be the source of the virus. '},
{'Date': 'January 5, 2020',
'Comment': ' China announces that the unknown pneumonia cases in Wuhan are not SARS or MERS. In a statement, the Wuhan Municipal Health Commission says a retrospective probe into the outbreak has been initiated. '},
{'Date': 'January 7, 2020',
'Comment': ' Chinese authorities confirm that they have identified the virus as a novel coronavirus, initially named 2019'},
{'Date': 'January 11, 2020',
'Comment': ' The Wuhan Municipal Health Commission announces the first death caused by the coronavirus. A 61'},
{'Date': 'January 13, 2020',
'Comment': ' Thai authorities report a case of infection caused by the coronavirus. The infected individual is a Chinese national who had arrived from Wuhan. '},
{'Date': 'January 16, 2020',
'Comment': ' Japanese authorities confirm that a Japanese man who traveled to Wuhan is infected with the virus. '},
{'Date': 'January 17, 2020',
'Comment': ' Chinese health officials confirm that a second person has died in China. The US responds to the outbreak by implementing screenings for symptoms at airports in San Francisco, New York and Los Angeles. '},
{'Date': 'January 20, 2020',
'Comment': ' China reports 139 new cases of the sickness, including a third death. '},
{'Date': 'January 20, 2020',
'Comment': ' The National Institutes of Health announces that it is working on a vaccine against the coronavirus. "The NIH is in the process of taking the first steps towards the development of a vaccine," says Dr. Anthony Fauci, director of the National Institutes of Allergy and Infectious Diseases.'},
{'Date': 'January 21, 2020',
'Comment': ' Officials in Washington state confirm the first case on US soil. '},
{'Date': 'January 22, 2020',
'Comment': ' Wuhan says it will "temporarily" close its airport and railway stations for departing passengers following news that the death toll from the Wuhan Coronavirus has risen to 17. Chinese authorities confirm at least 547 cases in the mainland. '},
{'Date': 'January 23, 2020',
'Comment': ' At an emergency committee convened by the World Health Organization, the WHO says that the Wuhan coronavirus does not yet constitute a public health emergency of international concern.'},
{'Date': 'January 23, 2020',
'Comment': ' The Beijing Culture and Tourism Bureau cancels all large'},
{'Date': 'January 26, 2020',
'Comment': ' The China Association of Travel Services reports that all tours, including international ones, will be suspended. '},
{'Date': 'January 28, 2020',
'Comment': ' Chinese President Xi Jinping meets with WHO Director General Tedros Adhanom in Beijing. At the meeting, Xi and the WHO agree to send a team of international experts, including US Centers for Disease Control and Prevention staff, to China to investigate the coronavirus outbreak. '},
{'Date': 'January 29, 2020',
'Comment': ' The White House announces the formation of a new task force that will help monitor and contain the spread of the virus, and ensure Americans have accurate and up'},
{'Date': 'January 30, 2020',
'Comment': ' The US reports its first confirmed case of person'},
{'Date': 'January 31, 2020',
'Comment': ' The Donald Trump administration announces it will deny entry to foreign nationals who have traveled in China in the last 14 days.'},
{'Date': 'February 2, 2020',
'Comment': ' A man in the Philippines dies from the Wuhan coronavirus '},
{'Date': 'February 3, 2020',
'Comment': " China's Foreign Ministry accuses the US government of inappropriately reacting to the outbreak and spreading fear by enforcing travel restrictions. "},
{'Date': 'February 4, 2020',
'Comment': ' The Japanese Health Ministry announces that ten people aboard the Diamond Princess cruise ship moored in Yokohama Bay are confirmed to have the coronavirus. The ship, which is carrying more than 3,700 people, is placed under quarantine scheduled to end on February 19.'},
{'Date': 'February 7, 2020',
'Comment': ' Li Wenliang, a Wuhan doctor who was targeted by police for trying to sound the alarm on a "SARS'},
{'Date': 'February 8, 2020',
'Comment': ' The US Embassy in Beijing confirms that a 60'},
{'Date': 'February 10, 2020',
'Comment': ' Xi inspects efforts to contain the Wuhan coronavirus in Beijing, the first time he has appeared on the front lines of the fight against the outbreak. On the same day, a team of international experts from WHO arrives in China to assist with containing the coronavirus outbreak.'},
{'Date': 'February 10, 2020',
'Comment': ' The Anthem of the Seas, a Royal Caribbean cruise ship, sets sail from Bayonne, New Jersey, after a coronavirus scare had kept it docked and its passengers waiting for days.'},
{'Date': 'February 11, 2020',
'Comment': ' The WHO names the coronavirus COVID'},
{'Date': 'February 13, 2020', 'Comment': " China's state"},
{'Date': 'February 14, 2020',
'Comment': ' A Chinese tourist who tested positive for the virus dies in France, becoming the first person to die in the outbreak in Europe. '},
{'Date': 'February 14, 2020',
'Comment': " Egypt announces its first case of Wuhan coronavirus on Friday, according to a joint statement by Egypt's Ministry of Health and the WHO. The confirmed case marks the first in Africa since the virus was detected. "},
{'Date': 'February 15, 2020',
'Comment': '  The official Communist Party journal Qiushi publishes the transcript of a speech made on February 3 by Xi in which he "issued requirements for the prevention and control of the new coronavirus" on January 7, revealing Xi knew about and was directing the response to the virus on almost two weeks before he commented on it publicly. '},
{'Date': 'February 18, 2020',
'Comment': ' Xi says in a phone call with British Prime Minister Boris Johnson that China\'s measures to prevent and control the epidemic "are achieving visible progress," according to state news Xinhua.'},
{'Date': 'February 19, 2020',
'Comment': ' Passengers who have tested negative for the novel coronavirus begin disembarking from the stricken Diamond Princess cruise ship, despite mounting evidence from infectious disease experts they could unknowingly be carrying the virus back into their communities.'},
{'Date': 'February 21, 2020',
'Comment': ' The CDC changes criteria for counting confirmed cases of novel coronavirus in the US and begins tracking two separate and distinct groups: those repatriated by the US Department of State and those identified by the US public health network.'},
{'Date': 'February 25, 2020',
'Comment': ' The NIH announces that a clinical trial to evaluate the safety and effectiveness of the antiviral drug remdesivir in adults diagnosed with coronavirus has started at the University of Nebraska Medical Center in Omaha. The first participant is an American who was evacuated from the Diamond Princess cruise ship docked in Japan. '},
{'Date': 'February 26, 2020',
'Comment': ' CDC officials say that a California patient being treated for novel coronavirus is the first US case of unknown origin. The patient, who didn\'t have any relevant travel history nor exposure to another known patient, is the first possible  US case of "community spread."'},
{'Date': 'February 26, 2020',
'Comment': " President Donald Trump places Vice President Mike Pence in charge of the US government response to the novel coronavirus, amid growing criticism of the White House's handling of the outbreak."
}];

function renderAllFact() {
    d3.select("#cnnData")
     .data(data)
     .enter()
    .append("span")
    .html(function(d) {
        return ( `<h5>${d.Date}  </h5> <p>${d.Comment} </p>`); 
     });  
}   

function renderFact(d) {
    console.log (d);
    d3.select("#cnnData")
   .append("span")
   .html ( `<h5>${d.Date}  </h5> <p>${d.Comment} </p>`);  

}

function renderfactbydate(date) {
    console.log("renderfactbydate", date);
    var facts = data.filter(fact => fact.Date === date);

    console.log("renderfactbydate", facts);
    facts.forEach(element => {
        renderFact(element);   
    });
    

}

renderFact(data[0]); 
// renderAllFact();
renderfactbydate("February 26, 2020" )


