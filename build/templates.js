angular.module("app").run(["$templateCache", function($templateCache) {

  $templateCache.put("templates/nodes.html",
    "<h1>Nodes</h1>" +
    "<ul class=\"nodes\">" +
    "  <li ng-repeat=\"node in nodes\">" +
    "      {{node.node}}" +
    "      <ul>" +
    "          <li ng-repeat=\"cn in node.childNodes\">{{cn.node}}</li>          " +
    "          <li>" +
    "              <form name=\"ncf\" ng-submit=\"newChildNode()\">" +
    "                  <input ng-model=\"newChildName\" name=\"newChildName\" type=\"input\" placeholder=\"childNode Value\" required />" +
    "                  <input type=\"submit\" value=\"create Child\" />" +
    "              </form>" +
    "          </li>" +
    "      </ul>" +
    "  </li>" +
    "  <li>" +
    "      <form name=\"nf\" ng-submit=\"newNode()\">" +
    "          <input ng-model=\"newNodeName\" type=\"input\" placeholder=\"Node Value\" required />" +
    "          <input type=\"submit\" value=\"create Parent\" />" +
    "      </form>      " +
    "  </li>" +
    "</ul>" +
    "<hr/>"
  );

  $templateCache.put("templates/partial1.html",
    "<h1>Users</h1>" +
    "<!-- Lots of nifty things happening here. We are:" +
    "  - creating an <input/> for every person in the user array" +
    "  - binding each <input/> value to the user's name" +
    "  - conditionally applying the \".awesome\" css class if user.awesome is set to true (which happens after save to server)." +
    "  - calling saveAll() in our controller when the button is clicked, which then updates all the users on the server" +
    "-->" +
    "<div class=\"users\">" +
    "  <input ng-repeat=\"user in users\" ng-model=\"user.name\" ng-class=\"{awesome : user.awesome}\">" +
    "  </input>" +
    "  <input type=\"button\" value=\"Save Changes\" ng-click=\"saveAll()\"></input>" +
    "</div>" +
    "<hr/>"
  );

  $templateCache.put("templates/partial2.html",
    "<p>This is the partial for view 2.</p>" +
    "<p>" +
    "  Showing of 'interpolate' filter:" +
    "  {{ 'Current version is v%VERSION%.' | interpolate }}" +
    "</p>" +
    ""
  );

}]);
