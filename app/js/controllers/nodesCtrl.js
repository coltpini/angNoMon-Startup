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