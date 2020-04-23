const request = require('request-promise')
const azure = require('azure-storage');

module.exports = async function (context, myTimer) {
    const response = await request('http://o-api.azurewebsites.net/api/events')
    const events = JSON.parse(response).events

    const tableService = azure.createTableService(process.env.AzureWebJobsStorage);

    const query = new azure.TableQuery()
        .where('PartitionKey eq ?', 'Test');

    tableService.queryEntities('Events', query, null, {autoResolveProperties: true}, (error, result, response) => {
        console.log(result.entries[0].PartitionKey._)
        tableService.replaceEntity('Events', {
            PartitionKey: "Test",
            RowKey: "Tst",
            Lala: 'Lala'
        }, (error, result, response) => {
            if(error) {
                console.error(error)
            }
            context.done();
        });

    })
};