angular.module('chatApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/chat-room/chat.room.html',
    "<div ng-If=\"room\">\r" +
    "\n" +
    "    <!--CHAT MESSAGES-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"col-sm-9\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "            Messages from {{room}} Room\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul class=\"messages\" schroll-bottom=\"messages\">\r" +
    "\n" +
    "            <li ng-repeat=\"message in messages\">\r" +
    "\n" +
    "                <div class=\"sender\" ng-class=\"{'floatright': loggedUsername==message.sender}\">\r" +
    "\n" +
    "                    <div class=\"sender-message\"><span>{{message.sender}}</span></div>\r" +
    "\n" +
    "                    <div class=\"text-message\" ng-bind-html=\"message.text | linky \"></div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"footer\">\r" +
    "\n" +
    "            <input type=\"text\" ng-model=\"message.text\" id=\"txtSend\" onkeydown=\"if(event.keyCode == 13) {document.getElementById('btnSend').click(); $('#txtSend').val('')}\" />\r" +
    "\n" +
    "            <button class=\"btn purple\" ng-click=\"sendMessage(message.text); message.text = null\" id=\"btnSend\"><i class=\"fa fa-send\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <!--USERS FROM ROOM-->\r" +
    "\n" +
    "    <div class=\"col-sm-3 userList\">\r" +
    "\n" +
    "        <div ng-if=\"roomUsers.length > 1\"> {{roomUsers.length}} available users in {{room}}:</div>\r" +
    "\n" +
    "        <div ng-if=\"roomUsers.length == 1\"> {{roomUsers.length}} available user in {{room}}:</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul class=\"list-active-users\">\r" +
    "\n" +
    "            <li ng-repeat=\"activeuser in roomUsers track by $index\">\r" +
    "\n" +
    "                <i class=\"fa fa-chevron-circle-down green\" aria-hidden=\"true\"></i> {{activeuser}} <i ng-show=\"loggedUsername=='admin'\" ng-click=\"kick(activeuser)\" class=\"fa fa-coffee\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <button class=\"btn btn-warning leave\" ng-click=\"leaveRoom(loggedUsername)\">leave room <i class=\"fa fa-plane\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-If=\"!room\">\r" +
    "\n" +
    "    Enter a chat room & have fun!\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('components/chat/chat.html',
    "<nav class=\"navbar navbar-inverse\" role=\"navigation\">\r" +
    "\n" +
    "    <div class=\"col-sm-3\">\r" +
    "\n" +
    "        <img class=\"pull-left white logo\" src=\"http://parastudios.de/files/chat_vector/facebook_chat.png\" alt=\"logo\" />\r" +
    "\n" +
    "        <h4 class=\"white\"> Hello, {{userName}} !</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"pull-right\">\r" +
    "\n" +
    "        <button class=\"btn btn-default btn-xs logout\" ng-click=\"logout()\">Log Out <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> </button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</nav>\r" +
    "\n" +
    "<div ng-show=\"userInRomm\" class=\"alert alert-warning\">\r" +
    "\n" +
    "    Warning! You are already in this room!\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-sm-3\">\r" +
    "\n" +
    "        <div class=\"spinicon\" ng-show=\"!roomNames\"><i class=\"fa fa-spin fa-spinner fa-5\" aria-hidden=\"true\"></i></div>\r" +
    "\n" +
    "        <div ng-show=\"roomNames\"> {{roomNames.length}} available chat rooms:</div>\r" +
    "\n" +
    "        <div class=\"roomNameDisplay\">\r" +
    "\n" +
    "            <ul class=\"list-group\" ng-if=\"rooms\">\r" +
    "\n" +
    "                <li class=\"list-group-item\" ng-repeat=\"key in rooms\">\r" +
    "\n" +
    "                    {{key.roomName}}\r" +
    "\n" +
    "                    <span class=\"badge pull-left\">\r" +
    "\n" +
    "                    {{getCount(key.users)}}\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                    <button class=\"btn btn-xs pull-right roz\" ng-click=\"joinRoom(key.roomName); listRooms()\" ng-hide=\"hideRooms\">\r" +
    "\n" +
    "                     join  <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i> \r" +
    "\n" +
    "                </button>&nbsp;&nbsp;\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"buttonCreateRoom\">\r" +
    "\n" +
    "            <create-room></create-room>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-sm-9\">\r" +
    "\n" +
    "        <ui-view></ui-view>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('components/directives/createRoom.html',
    "\r" +
    "\n" +
    "<div class=\"container-fluid\">\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn purple \" data-toggle=\"modal\" data-target=\"#myModal\">\r" +
    "\n" +
    "  create new room <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "</button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "   \r" +
    "\n" +
    "  <!-- Modal -->\r" +
    "\n" +
    "  <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r" +
    "\n" +
    "    <div class=\"modal-dialog\">\r" +
    "\n" +
    "    \r" +
    "\n" +
    "      <!-- Modal content-->\r" +
    "\n" +
    "      <div class=\"modal-content container-fluid\">\r" +
    "\n" +
    "        <div class=\"modal-header\">\r" +
    "\n" +
    "          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r" +
    "\n" +
    "          <h4 class=\"modal-title\">Enter Room Name</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body\">\r" +
    "\n" +
    "          <input type=\"text\" place-holder=\"room name\" ng-model=\"roomNameCreate\" required/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-footer\">\r" +
    "\n" +
    "          <button type=\"button\" ng-click=\"writeRoomData()\" class=\"btn btn-default\" data-dismiss=\"modal\">Create</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<!--<div ng-controller=\"ChatController\">\r" +
    "\n" +
    "  <div ng-show=\"alert.show\">\r" +
    "\n" +
    "    <alert type=\"alert.type\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <button class='btn' ng-click=\"addAlert()\">Add Alert</button>\r" +
    "\n" +
    "</div>-->"
  );


  $templateCache.put('components/home/home.html',
    "<!--<div class=\"container\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div role=\"alert\">\r" +
    "\n" +
    "            <span class=\"error\" ng-show=\"loginError\">\r" +
    "\n" +
    "                Username Required!</span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"login\">\r" +
    "\n" +
    "            <form class=\"form-inline\" name=\"loginForm\">\r" +
    "\n" +
    "                <div class=\"form-group\">\r" +
    "\n" +
    "                    <input type=\"text\" name=\"username\" ng-model=\"username\" class=\"form-control\" placeholder=\"Username\" required/>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </form>\r" +
    "\n" +
    "            <button class=\"btn btn-md purple\" ng-click=\"login(username)\"> <i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i> Log in</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "   <link rel=\"stylesheet\" href=\"components/home/login.css\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"profile\">\r" +
    "\n" +
    "    <!--<button class=\"profile__avatar\" id=\"toggleProfile\">\r" +
    "\n" +
    "     <img src=\"delasusan.ico\"> \r" +
    "\n" +
    "    </button>-->\r" +
    "\n" +
    "    <!--<div class=\"profile__form\">\r" +
    "\n" +
    "      <div class=\"profile__fields\">-->\r" +
    "\n" +
    "        <div class=\"field\">\r" +
    "\n" +
    "          <input type=\"text\" id=\"fieldUser\" class=\"input\" ng-model=\"username\" required pattern=.*\\S.* />\r" +
    "\n" +
    "          <label for=\"fieldUser\" class=\"label\">Username</label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "		\r" +
    "\n" +
    "       \r" +
    "\n" +
    "        <div class=\"profile__footer\">\r" +
    "\n" +
    "          <button class=\"btnbtn\" ng-click=\"login(username)\">Login</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "		\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "     </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "  \r" +
    "\n" +
    "\r" +
    "\n" +
    "<!--<script>\r" +
    "\n" +
    "    document.getElementById('toggleProfile').addEventListener('click', function () {\r" +
    "\n" +
    "  [].map.call(document.querySelectorAll('.profile'), function(el) {\r" +
    "\n" +
    "    el.classList.toggle('profile--open');\r" +
    "\n" +
    "  });\r" +
    "\n" +
    "});\r" +
    "\n" +
    "</script>-->"
  );

}]);
