// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

var hdb = require('@sap/hana-client');
let config = require('./config.js');

class Connection {

  static instance;
  static connected = false;
  static config;

  constructor() {
    if (Connection.instance) {
      return Connection.instance;
    }
    Connection.instance = this;
    this.config = new config();
  }

  connect() {

    var that = this;

    return new Promise(function(resolve, reject) {

      if(!that.connected) {

        if(that.config.secureConnection)
        {
          console.log("Establishing !secure! SAP HANA connection to "+that.config.host+" as "+ that.config.user +"...");
          that.client = hdb.createClient({
            host           : that.config.host, // system database host
            instanceNumber : that.config.instanceNumber,       // instance number of the HANA system
            databaseName   : that.config.databaseName,      // name of a particular tenant database
            user           : that.config.user,     // user for the tenant database
            password       : that.config.password,    // password for the user specified
            encrypt: 'true',
            sslValidateCertificate: 'false'
          });
        }
        else
        {
          console.log("Establishing SAP HANA connection to "+that.config.host+" as "+ that.config.user +"...");
          that.client = hdb.createClient({
            host           : that.config.host, // system database host
            instanceNumber : that.config.instanceNumber,       // instance number of the HANA system
            databaseName   : that.config.databaseName,      // name of a particular tenant database
            user           : that.config.user,     // user for the tenant database
            password       : that.config.password    // password for the user specified
          });
        }

        that.client.connect(function (err) {
          if (err) {
            that.connected = false;
            throw err;
            reject(err);
          }
          
          console.log('Connected');
          that.connected = true;
          resolve(that.client);
        });
      }
      else
      {
        resolve(that.client);
      }

    });

  }
}

module.exports = Connection;