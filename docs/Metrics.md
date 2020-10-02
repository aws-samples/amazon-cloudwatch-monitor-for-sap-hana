# Metrics

Inspired by [SAP Note 2222110: Which load history constellations are potentially critical?](https://launchpad.support.sap.com/#/notes/2222110)

GENERIC

- LAST_COMPLETED_BACKUP_IN_HOURS
- LAST_COMPLETED_LOG_BACKUP_IN_HOURS 
- ALERT_COUNT_ERRORS
- ALERT_COUNT_HIGHS
- ALERT_COUNT_INFOS
- ALERT_COUNT_LOWS
- ALERT_COUNT_MEDIUMS
- TOTAL_SIZE_DATA_GB
- USED_SIZE_DATA_GB
- TOTAL_SIZE_LOG_GB
- USED_SIZE_LOG_GB
- HSR Status

HOST

- CPU_PCT
- HANA_USED_MEMORY_GB
- HANA_RESIDENT_MEMORY_GB
- HANA_ALLOCATION_LIMIT_GB
- TOTAL_RESIDENT_MEMORY_GB
- TOTAL_MEMORY_GB
- DISK_USED_GB - not used
- DISK_SIZE_GB - not used
- NETWORK_IN_BYTE
- NETWORK_OUT_BYTE

INDEXSERVER

- CPU_PCT_INDEXSERVER: CPU used by indexserver
- SYSTEM_CPU_PCT_INDEXSERVER: System CPU used by indexserver
- MEMORY_USED_GB / MEMORY_ALLOCATION_LIMIT_GB: Allocation limit used by indexserver
- CS_UNLOAD_COUNT: Column store unloads
- SWAP_IN_BYTE: Swap in
- PING_TIME_MS: Load history ping time
- PENDING_SESSION_COUNT: Pending sessions
- MVCC_VERSION_COUNT: Row store versions
- Gap in load history = e.g. no CPU metrics
- WAITING_THREAD_COUNT: Waiting threads
- BLOCKED_TRANSACTION_COUNT: Blocked transactions