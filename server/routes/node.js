    //node services
    module.exports = function(app){
    var mongoose = app.get('mongoose'),
        Node = app.get('Node');        
    
    app.get('/node', function(req, res){ 
        console.log('getting Nodes');
        Node.find(function(err, nodes){                   
            res.send(nodes);
        });    
    });
    
    app.get('/node/:id', function(req, res){
        var id = req.params.id;
        console.log('getting Node #' + id);
        Node.find({_id: id}, function(err, nodes){
            res.send(nodes);
        });
    });
    
    app.put('/node/:id', function(req, res){
        var node = req.body.node;
        var id = req.params.id;
        var cn = req.body.childNodes;
        console.log('updating node #' + id + " to: " + node + "with cns: " + cn);
        Node.findByIdAndUpdate(id, {node: node, childNodes: cn}, function(err, nodes){
            res.send(nodes);
        });
    });
    
    app.post('/node', function(req, res){
        var node = req.body.node;
        console.log('Creating new node: ' + node );
        var n = new Node({node: node});
        n.save(function(err,node){
            res.send(node);
        });
    });
    
    app.del('/node/:id', function(req, res){
        var id = req.params.id;
        console.log('deleting Node' + id );
        Node.remove({_id: id}, function(err){
            res.send(204);
        });
    }); 
    
    /*
        I might need these later
    
    app.get('/childNode/:id', function(req, res){
        var id = req.params.id;
        console.log('getting childNode #' + id);
        var childNodes = Node.childNodes.id(id);
        res.send(childNodes);
    });
  
    app.put('/childNode/:id', function(req, res){
        var childNode = req.body.node,
            pid = req.body.pid,
            id = req.params.id;
        console.log('updating childNode #' + id + " to: " + childNode);
        Node.find({_id: id}, function(err, node){
            node.children.id(id).node = childNode;
            node.save();
            res.send(node);
        });
    });

    app.post('/childNode', function(req, res){
        var childNode = req.body.node,
            pid = req.body.pid;
        console.log('adding childNode: ' + childNode + ' in node #' + pid);
        Node.find({_id: pid}, function(err,node){
            node.childNodes.push({node: childNode});
            res.send(node);
        });
    });
    
    app.del('/childNode/:id', function(req, res){
        var id = req.params.id;
        console.log('deleting childNode #' + id);
        ChildNode.remove({_id: id}, function(err){
            res.send(204);
        });
    });   
    */
};
