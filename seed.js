const MongoClient = require('mongodb').MongoClient;
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

var time = new Date().getTime();

var obj = {
    test1: 'kjwbfjblbcjbckjbckjcbkjsc',
    test2: 'jcbkjbskcbskdjcbkjsdbcksjbskjbsdkjcbs',
    test3: 'jcnkjsbcnkjsdbcksdbcskcbsddsckb'
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} finished`)
    });
} else {
    seedDB();
    console.log(`Worker ${process.pid} started`)
}


function seedBD() {
    MongoClient.connect(`mongodb://localhost/`).then((client) => {
        const db = client.db('recs');
        const collection = db.connection('testing');

        var count = parseInt(10000000 / numCPUs);
        const size = 20000;

        async function insertBulk() {
            var ops = _.range(0, size).map((id) => {
                return {insertOne: {'document': {...obj, rid: id*Math.random() } }};
            });
            await collection.bulkWrite(ops, {ordered: false});
            count -= size;
            if (count > 0) {
                insertBulk();
            } else {
                console.log('done in', (new Date().getTime() - time) / 1000, 's <3 <@;) ,(^_^<))  ');
                client.close();
                process.exit();
            }
        }
        insertBulk();
    });
}