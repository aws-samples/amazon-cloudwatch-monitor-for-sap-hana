// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

let config = require('./config.js');
let connection = require('./connect.js');
let utils = require('./utils.js');
let dp_sql = require('./dataprovider_sql.js');

exports.lambdaHandler = async (event, context) => {

    myconfig = new config();
    myconnection = new connection();

    if (typeof event.refresh !== 'undefined') {
        console.log("Resetting Configuration!");
        myconfig.reset();
        myconnection.connected = false;
    }

    const promise = new Promise(function(resolve, reject) {

        try {

            myconfig.readSecrets().then(function() {

                myconnection.connect().then(function(client) {

                    var start = new Date();
                    
                    const pr_version = dp_sql.fetch(client, "hana_version.sql", ["VERSION"]);

                    const pr_backup1 = dp_sql.fetch(client, "hana_lastcompletebackup.sql", ["LAST_COMPLETED_BACKUP_IN_HOURS"]);
                    const pr_backup2 = dp_sql.fetch(client, "hana_lastlogbackup.sql", ["LAST_COMPLETED_LOG_BACKUP_IN_HOURS"]);

                    const pr_err1 = dp_sql.fetch(client, "hana_current_alert_count_error.sql", ["ALERT_COUNT_ERRORS"]);
                    const pr_err2 = dp_sql.fetch(client, "hana_current_alert_count_high.sql", ["ALERT_COUNT_HIGHS"]);
                    const pr_err3 = dp_sql.fetch(client, "hana_current_alert_count_info.sql", ["ALERT_COUNT_INFOS"]);
                    const pr_err4 = dp_sql.fetch(client, "hana_current_alert_count_low.sql", ["ALERT_COUNT_LOWS"]);
                    const pr_err5 = dp_sql.fetch(client, "hana_current_alert_count_medium.sql", ["ALERT_COUNT_MEDIUMS"]);

                    const pr_perf1 = dp_sql.fetch(client, "hana_load_history_host.sql", ["CPU_PCT","HANA_USED_MEMORY_GB","HANA_RESIDENT_MEMORY_GB","HANA_ALLOCATION_LIMIT_GB","TOTAL_RESIDENT_MEMORY_GB","TOTAL_MEMORY_GB","DISK_USED_GB","DISK_SIZE_GB","NETWORK_IN_BYTE", "NETWORK_OUT_BYTE"]);
                    const pr_perf2 = dp_sql.fetch(client, "hana_load_history_indexserver.sql", ["CPU_PCT_INDEXSERVER","SYSTEM_CPU_PCT_INDEXSERVER","MEMORY_USED_GB","MEMORY_ALLOCATION_LIMIT_GB","CS_UNLOAD_COUNT","SWAP_IN_BYTE","PING_TIME_MS","PENDING_SESSION_COUNT","MVCC_VERSION_COUNT","WAITING_THREAD_COUNT","BLOCKED_TRANSACTION_COUNT"]);

                    const pr_vol1 = dp_sql.fetch(client, "hana_volume_usage_data.sql", ["TOTAL_SIZE_DATA_GB", "USED_SIZE_DATA_GB"]);
                    const pr_vol2 = dp_sql.fetch(client, "hana_volume_usage_log.sql", ["TOTAL_SIZE_LOG_GB","USED_SIZE_LOG_GB"]);
                    const pr_vol3 = dp_sql.fetch(client, "hana_volume_usage_trace.sql", ["TOTAL_SIZE_TRACE_GB","USED_SIZE_TRACE_GB"]);

                    const pr_sr = dp_sql.fetch(client, "hana_system_replication.sql", ["REPL_STATUS"]);

                    //ALL DONE, SUBMIT
                    Promise.all([
                        pr_version, 
                        pr_backup1, 
                        pr_backup2, 
                        pr_err1, 
                        pr_err2, 
                        pr_err3, 
                        pr_err4, 
                        pr_err5, 
                        pr_perf1, 
                        pr_perf2,
                        pr_vol1,
                        pr_vol2,
                        pr_vol3,
                        pr_sr
                    ]).then(function() {

                        var end = new Date() - start;
                        console.log('Total SQL Execution time: %dms', end);

                        var myutils = new utils();
                        myutils.submit().then(function() {
                            resolve();
                        });

                    });
                });
            });
        } catch (error) {
            throw error;
        }
    })
    return promise;
};