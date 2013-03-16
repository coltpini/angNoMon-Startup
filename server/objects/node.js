module.exports = function(app) {
    var mongoose = app.get('mongoose');  
    var myNodes = ['first','Second','Third','Fourth'];
    var childSchema = mongoose.Schema({
        node: String
    });
      
    var nodeSchema = mongoose.Schema({
        node: String,
        childNodes: [childSchema]
    });
    
    var Node = mongoose.model('Node', nodeSchema);
    
//    Node.find(function(err, nodes){
//        if(err){}
//        if(nodes.length < 1){
//            console.log("adding some data here because there wasn't any in the db");
//            for(var i=0;i<myNodes.length;i++){
//                console.log("adding '" + myNodes[i] + "'");
//                var n = new Node({node: myNodes[i]});
//                n.save(function(err,node){});
//            }
//        }
//    });
    
    return Node;
};