# node_elasticsearch_example
Example for Nodejs with Express Framework, use ElasticSearch with data from MySql

# refer from: 
## to setup express project http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
## to setup elasticsearch https://blog.raananweber.com/2015/11/24/simple-autocomplete-with-elasticsearch-and-node-js/

# use database world from mysql or import from {thisproject/data/world.sql}
# update database connection info in connection.js
# run elasticsearch from \elasticsearch-5.0.0\bin\elasticsearch.bat
# create and build the index manual
## open cmd
## cd \thisproject\elasticsearch
## node create
## node forceBuildIndex
## next time index will auto rebuild by schulue (app.js line 54-57)
# check elasticsearch server
## mapping http://localhost:9200/world?pretty=true
## search http://localhost:9200/world/_search?pretty=true&size=1000
# test with postman
## method POST
## url http://localhost:3000/search/
## body
{
	"requestmsg": {
		"searchInfo": {
			"q": "Andorra"
		}
	}
}

Contact info: nhkhanh0408@gmail.com
