/* Node service */
angular.module('app').factory('Node', ['$resource', function($resource){
    return $resource('node/:id', {id: '@id'}, {
        update: {method: 'PUT'}   
    });
}]);

/* old
angular.module('app').factory('Node', ['$resource', function($resource){
    
        var node = $resource('node/:id', {id: '@id'}, {
            update: {method: 'PUT'}
        });
        
        var childNode = $resource('childNode/:id', {id: '@id'}, {    
            update: {method: 'PUT'}
        });
    
        var nodeChildNode = $resource('node/:id/childNode/', {id: '@id'}, {
            get: {method:'GET'}
        });
            
        var NodeService = {            
            getNodes : function(callback){
                node.query(function(data){
                    callback(data);
                });    
            },  
            getChildrenForNode : function(node, callback){
                nodeChildNode.query({id:node._id},function(data){
                    callback(data);
                });
            },
            addNode: function(nd,callback){
                var n = new node();
                n.node = nd.node;
                n.$save();
                console.log(n);
                callback(n);
            },
            addChildNode: function(nd,callback){
                var cn = new childNode();
                cn.node = nd.node;
                cn.pid = nd.pid;
                cn.$save();
                console.log(cn);
                callback(cn);
            },
            deleteNode: function(callback){
                //delete node and all children nodes.
            },
            deleteChildNode : function(callback){
            }
        };
        
        
    return NodeService;
}]); */