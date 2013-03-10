    //node services
    module.exports = function(app){
    var mongoose = app.get('mongoose'),
        Node = app.get('Node');        
        app.get('/node', function(req, res){ 
        Node.find(function(err, nodes){
            res.send(nodes);
        });    
    });
    
    app.get('/node/:id', function(req, res){
        var id = req.params.id;
        Node.find({_id: id}, function(err, nodes){
            res.send(nodes);
        });
    });
    
    app.put('/node/:id', function(req, res){
        var node = req.body.node;
        var id = req.params.id;
        Node.findByIdAndUpdate(id, {node: node}, function(err, nodes){
            res.send(nodes);
        });
    });
    
    app.post('/node', function(req, res){
        var node = req.body.node;
        var n = new Node({node: node});
        n.save(function(err,node){
            res.send(node);
        });
    });
    
    //delete user
    app.del('/node/:id', function(req, res){
        var id = req.params.id;
        Node.remove({_id: id}, function(err){
                res.send(204);
            });
        });  
    };
