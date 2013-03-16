angular.module('app').controller('NodesCtrl', ['$scope', 'Node', function($scope, Node){
    var nodes = Node.query(function(){
        $scope.nodes = nodes;
    });
    
    $scope.newNode = function(){
        var node = new Node();
        node.node = this.newNodeName;
        node.$save();
        $scope.nodes.push(node);
        this.newNodeName = "";
    };
    $scope.updateNode = function(){
        var n = this.node;
        n.childNodes.push({node: this.newChildName});
        n.$update({id:n._id});
        this.newChildName = "";
    };
}]);
/* ye example stuff 

old stuff for this.
//    $scope.newChildNode = function(){
//        var pn = this.node; 
//        var n = {node: this.newChildName, pid: pn._id};
//        Node.addChildNode(n);
//        $scope.nodes.push(pn);
//    };

  //here's how to fetch a resource from the server
  
  var user = User.get({id: 2}, function(){
    //here's how to update a resource
    user.$update(function(){
      //whatever is sent back by server is automatically set by Angular
      console.log('user.awesome', user.awesome); //thanks server!
    });

    //here's how to delete a resource from the server
    user.$delete();
  });
  

  //here's how to create a new resource
  
  var user2 = new User();
  user2.neat = true;
  user2.$save();
  
*/
/*
ye olde stuff
angular.module('app').controller('NodesCtrl', ['$scope', 'Node', function($scope, Node){
    Node.getNodes(function(nodes){
        $scope.nodes = nodes;
        $scope.nodes.forEach(function(node){
            Node.getChildrenForNode(node,function(childNodes){
                node.childNodes = childNodes;                
            });
        });
    }); 
    
    $scope.newNode = function(){
        var node = {
            node: this.newNodeName
        };
        Node.addNode(node, function(nd){
            $scope.nodes.push(nd);          
        });
        this.newNodeName = "";
    };
  
    $scope.newChildNode = function(){
        var pn = this.node;
        var node = {
            node: this.newChildName,
            pid: pn._id
        };
        Node.addChildNode(node, function(nd){
            if(!pn.childNodes)
                pn.childNodes = [];
            
            pn.childNodes.push(nd);            
        });
        this.newChildName = "";

    };
}]);
*/