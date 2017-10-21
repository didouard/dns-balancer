# dns-balancer
Check service and update DNS accordingly

## Approch
3 Classes types :
 - Probes : Independant probe who simply update his status on Redis
    - Probe have one type (ip, http, application check, ...) 
 - Backend : Check probes status. 
    - If probes don't exit, publish a new probes on redis 
    - On probe change, update DNS accordingly
    - Backend can have one or more Probe
 - Services : A service name
    - Services can have one or more Backend

## Redis 


dns-balancer:service_name


## TODO
 - Engine to load probes at startup and do hot running swap
 
