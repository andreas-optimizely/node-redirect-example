# Node Full Stack Redirect Example
---

An example of using [Optimizely Full Stack](https://docs.developers.optimizely.com/full-stack) to perform a server-side redirect A/B test using the [Optimizely Express pacakge](https://www.npmjs.com/package/@optimizely/express)

## SDK Setup

**Initializing Optimizely**
First we need to create an Optimizely object to take advantage of Optimizely's traffic splitting and event tracking features.

In `index.js`:

```
const optimizelyExpress = require('@optimizely/express');

// Replace with your own SDK KEY
let SDK_KEY = 'H9RM6qWYQbPEbmbCfwx3o1'

// Instantiating Optimizely
const optimizely = optimizelyExpress.initialize({
  sdkKey: SDK_KEY,
  datafileOptions: {
    autoUpdate: true,
    // Setting polling interval to every 5 seconds for demo purposes
    updateInterval: 5000 
  }
});

app.use(optimizely.middleware);
```

## Experiment Setup

In Optimizely, I created a [feature flag](https://docs.developers.optimizely.com/full-stack/docs/create-feature-flags). 

Then I created a [feature test](https://docs.developers.optimizely.com/full-stack/docs/run-feature-tests) using that flag to split traffic 50% to receive the flag `disabled`, 50% receive the flag `enabled`.

In `/routes/index.js` I implmented my flag in my old endpoint where I want to redirect 50% of traffic to the new endpoint.

```
let enabled = req.optimizely.client.isFeatureEnabled('newFeature', userId);
  
if(enabled){
	return res.status(302).redirect('/new');
}
```

