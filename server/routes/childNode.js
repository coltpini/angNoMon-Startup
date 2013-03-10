//childNode services
module.exports = function(app){
    var mongoose = app.get('mongoose'),
        ChildNode = app.get('ChildNode');
          
    app.get('/childNode', function(req, res){ 
        ChildNode.find(function(err, childNodes){
            res.send(childNodes);
        });    
    });
    
    app.get('/childNode/:id', function(req, res){
        var id = req.params.id;
        ChildNode.find({_id: id}, function(err, childNodes){
            res.send(childNodes);
        });
    });
  
    app.get('/node/:pid/childNode', function(req,res){
        //console.log(req.params.pid);
        var pid = req.params.pid;          
        ChildNode.find({pid: pid}, function(err, childNodes){
            res.send(childNodes);
       });
    });

    app.put('/childNode/:id', function(req, res){
        var node = req.body.node,
            pid = req.body.pid,
            id = req.params.id;
        ChildNode.findByIdAndUpdate(id, {node: childNode, pid: pid}, function(err, childNodes){
            res.send(childNodes);
        });
    });

    app.post('/childNode', function(req, res){
        var node = req.body.node,
            pid = req.body.pid;
        var n = new ChildNode({node: node, pid: pid});
        n.save(function(err,childNode){
            res.send(childNode);
        });
    });
    
    app.del('/childNode/:id', function(req, res){
        var id = req.params.id;
        ChildNode.remove({_id: id}, function(err){
            res.send(204);
        });
    });  
};
