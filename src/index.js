const AWS = require("aws-sdk")
const client = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" })

// Mudancas a fazer caso seja necessário funcionar nas novas versoes
//const { DynamoDB, DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
//const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {

    console.debug("INPUT EVENT: \n" + JSON.stringify(JSON.parse(event.body), null, 2));
    
    let responseBody = ""
    let statusCode = 0
    
    let {id, price} = JSON.parse( event.body );
    
    const params = {
      TableName : "bootcamp-cognito-items",
      Item: {
         id: id,
         price: price
      },
    };
    
    try {
        
        console.debug("Parametros: "+JSON.stringify(params));

        await client.put( params )
            .promise()
            .catch(console.error);
        
        statusCode = 200;
        responseBody = JSON.stringify("Item inserido com sucesso. ");
        
    } catch (error) {
        
        statusCode = 400;
        responseBody = JSON.stringify("Erro ao tentar inserir: " + error);
        console.error("Erro ao tentar inserir " + error);
        
    }
      
    const response = {
        statusCode: statusCode,
        body: responseBody
    };
    
    return response;
};
