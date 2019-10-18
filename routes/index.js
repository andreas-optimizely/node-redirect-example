'use strict'

const express = require('express'),
         uuid = require('uuid/v4');

const router = express.Router();

router.get('/', (req, res, next) => {

  // Randomly generating a user ID for demo purposes
  let userId = uuid();

  // Set user id as a cookie for us to retrieve clientside
  res.cookie('userId', userId);

  /*
    Example using an Optimizely Feature Flag test 
    to redirect 50% of traffic to a new endpoint.
  */
  let enabled = req.optimizely.client.isFeatureEnabled('newFeature', userId);
  
  if(enabled){
    return res.status(302).redirect('/new');
  }

  /*
    Alternatively, we could use a pure A/B test with Optimizely
    let variation = req.optimizely.client.activate('redirectExperiment', userId);
    if(variation === 'redirect'){
      return res.status(302).redirect('/new');
    }
  */
  
  res.render('home', {
  	layout: 'default', 
  	template: 'home-template',
  	datafile:JSON.stringify(req.optimizely.datafile)
  });

});

// New route that users will get redirected to...
router.get('/new', (req, res, next) => {
  res.render('home-v2', {
    layout: 'default', 
    template: 'home-template',
    datafile:JSON.stringify(req.optimizely.datafile)
  });
});

module.exports = router