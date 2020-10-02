// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

var fs = require('fs');
var utils = require('./utils.js');


var fetch = function(client, file, keys){

    return new Promise(function(resolve, reject) {

        var rid = Math.floor(Math.random() * 100);

        var sql = fs.readFileSync('./SQL/'+file, 'utf8');
        console.log("["+rid+"] Executing: "+sql);

        var start = new Date();
        
        client.exec(sql, function (err, rows) {
            if (err) {
            console.error('Error:', err);
            reject("done");
            }
            var end = new Date() - start;
            console.log('['+rid+'] Execution time: %dms', end);

            console.log('['+rid+'] Result:', rows);

            var myutils = new utils();
            if(rows.length > 0)
            {
                for (let kindex = 0; kindex < keys.length; kindex++) {
                    var key = keys[kindex];
                    for (let index = 0; index < rows.length; index++) {
                        const element = rows[index];
                        value = element[key];
                        var myutils = new utils();
                        if(value != null && typeof value !== 'undefined')
                        {
                            myutils.collect(key,value);
                        }
                    }
                }
            }
            else
            {
                myutils.collect(keys[0],0);
            }

            resolve("done");
        });
    });
}

exports.fetch = fetch