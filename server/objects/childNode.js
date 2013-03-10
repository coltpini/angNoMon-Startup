module.exports = function(app) {
    var mongoose = app.get('mongoose');  
  //  var Node = app.get('Node');
    var myChildNodes = ['first Child','Second Child','Third Child','Fourth Child'];
      
    var childNodeSchema = mongoose.Schema({
        node: String,
        pid: String
    });
    
    return ChildNode = mongoose.model('ChildNode', childNodeSchema);    
};