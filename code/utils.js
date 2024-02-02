// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const { metricScope, Unit } = require("aws-embedded-metrics");
let config = require('./config.js');

class Utils {

    static instance;
    static config;
    //static ping = 0;
    //static status = 1;

    mymetrics = {};
  
    constructor(resolve) {
      if (Utils.instance) {
        return Utils.instance;
      }
      Utils.instance = this;
      this.config = new config();
    }
  
    collect(name, value) {
      //console.log("Found: "+name+" = "+value);
      this.mymetrics[""+name+""] = value;  
    }

    submit = metricScope(metrics =>
        async () => {
          
          if(this.config.debug)
          console.log(this.mymetrics);

          metrics.setNamespace(this.config.namespace);
          metrics.setDimensions({ bySID: this.config.databaseName });
          for (let index = 0; index < Object.keys(this.mymetrics).length; index++) {
              const key = Object.keys(this.mymetrics)[index];
              var value = this.mymetrics[key];

              if(typeof value == "string" && key != "VERSION")
              value = parseInt(value.trim())

              if(this.config.debug)
              console.log(key + ": "+value);
              
              if(key != "VERSION")
              metrics.putMetric(key, value, Unit.None);
          }
          //metrics.putMetric("PING", this.ping, Unit.None);
          //metrics.putMetric("STATUS", this.status, Unit.None);
        }
    );
}

module.exports = Utils;