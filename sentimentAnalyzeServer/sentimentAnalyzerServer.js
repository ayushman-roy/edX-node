const express = require('express');
const app = new express();

// use client folder for static resources
app.use(express.static('client'));

// cross origin references allowed
const cors_app = require('cors');
app.use(cors_app());

// dotenv for NLU API
const dotenv = require('dotenv');
dotenv.config();

// API credentials
const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

// function to make NLU instance
function getNLUInstance() {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

// broken function to test the analyzeParams for NLU
function nluTest(analyzeParams, test) {
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            if (test == "emotion") {
                return res.send(analysisResults.result.keywords[0].emotion, null, 2);
            }
            else {
                return res.send(analysisResults.result.keywords[0].sentiment, null, 2);
            }
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err)
        })
};

// default endpoint for the webserver
app.get("/", (req, res) => {
    res.render('index.html');
});

// for /url/emotion
app.get("/url/emotion", (req, res) => {
    let urlToAnalyze = req.query.url
    const analyzeParams =
    {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Retrieve the emotion and return it as a formatted string
            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

// for /url/sentiment
app.get("/url/sentiment", (req, res) => {
    let urlToAnalyze = req.query.url
    const analyzeParams =
    {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Retrieve the sentiment and return it as a formatted string

            return res.send(analysisResults.result.keywords[0].sentiment, null, 2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

// for /text/emotion
app.get("/text/emotion", (req, res) => {
    let textToAnalyze = req.query.text
    const analyzeParams =
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Retrieve the emotion and return it as a formatted string

            return res.send(analysisResults.result.keywords[0].emotion, null, 2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

// for /text/sentiment
app.get("/text/sentiment", (req, res) => {
    let textToAnalyze = req.query.text
    const analyzeParams =
    {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1
            }
        }
    }

    const naturalLanguageUnderstanding = getNLUInstance();

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            //Retrieve the sentiment and return it as a formatted string

            return res.send(analysisResults.result.keywords[0].sentiment, null, 2);
        })
        .catch(err => {
            return res.send("Could not do desired operation " + err);
        });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})