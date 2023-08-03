// collection / table post
//  - field -> post id
//  - field -> job describption
//  - field -> process status
// collection / table digest
//  - field -> post id
//  - field -> result 
//    -> content / email ?

// whole flow:
// store post in post collection
//  -> send REST call to kue-scheduler
//  -> kue-scheduler found a new request 
//    -> put it into 'now' queue
//  -> kue-scheduler complete request
//  -> kue-scheduler update post -> process status


