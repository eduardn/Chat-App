angular.module('chatApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('components/chat-room/chat.room.html',
    "\r" +
    "\n" +
    "<div>\r" +
    "\n" +
    "<div ng-If=\"room\">\r" +
    "\n" +
    "  <!--CHAT MESSAGES-->\r" +
    "\n" +
    "    <div class=\"col-sm-9\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"btnLeave\">\r" +
    "\n" +
    "         <div class=\"textRoom\"> Welcome to {{room}}!\r" +
    "\n" +
    "            <!--Messages from {{room}} Room-->\r" +
    "\n" +
    "                <button class=\"btn btn-success leave\" ng-click=\"leaveRoom(loggedUsername)\"><i class=\"fa fa-plane\" aria-hidden=\"true\" ></i> LEAVE </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "       <ul class=\"messages\" schroll-bottom=\"messages\" id=\"rawText\">\r" +
    "\n" +
    "            <li ng-repeat=\"message in messages\" >\r" +
    "\n" +
    "                <div class=\"sender-photo\"><img width=\"40px\" height=\"40px\" ng-src=\"{{message.senderPhotoURL}}\"></div>\r" +
    "\n" +
    "                <div class=\"sender\" ng-class=\"{'floatright': loggedUser.displayName == message.sender }\">\r" +
    "\n" +
    "                    <div class=\"sender-message\">\r" +
    "\n" +
    "                        <div class=\"test\"><span class=\"white\" >{{message.sender}}</span></div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "    \r" +
    "\n" +
    "                        <div ng-class=\"{'custom': loggedUser.displayName == message.sender}\"  class=\"text-message\"  ng-bind-html=\"message.text | linky | emoji \" >{{message.text}}</div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                \r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"footer\">\r" +
    "\n" +
    "            \r" +
    "\n" +
    "            <input class=\"input-text\" type=\"text\" ng-model=\"message.text\" ng-change=\"text = message.text\" id=\"txtSend\" onkeydown=\"if(event.keyCode == 13) {document.getElementById('btnSend').click(); $('#txtSend').val('')}\" />\r" +
    "\n" +
    "               <button class=\"btn purple\" ng-click=\"sendMessage(message.text); message.text = null\" id=\"btnSend\"><i class=\"fa fa-send\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "            <input type=\"hidden\" ng-model=\"text\" />\r" +
    "\n" +
    "         \r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <!--USERS FROM ROOM-->\r" +
    "\n" +
    "    <div class=\"col-sm-3 userList\">\r" +
    "\n" +
    "        <div ng-if=\"roomUsers.length > 1\" class=\"avUser\"> {{roomUsers.length}} available users in {{room}}:</div>\r" +
    "\n" +
    "        <div ng-if=\"roomUsers.length == 1\" class=\"avUser\"> {{roomUsers.length}} available user in {{room}}:</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul class=\"list-active-users\">\r" +
    "\n" +
    "            <li ng-repeat=\"activeuser in roomUsers track by $index\">\r" +
    "\n" +
    "                <i class=\"fa fa-chevron-circle-down green\" aria-hidden=\"true\"></i> {{activeuser.displayName}} <i ng-show=\"loggedUsername.displayName == roomCreator\" ng-click=\"kick(activeuser)\" class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "                <span ng-show=\"activeuser.displayName == roomCreator\">(Admin)</span>\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"row\" ng-If=\"!room\">\r" +
    "\n" +
    "Enter a chat room & have fun!\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
  );


  $templateCache.put('components/chat/chat.html',
    "<div class=\"row chat-body\">\r" +
    "\n" +
    "    <nav class=\"navbar navbar-inverse\" role=\"navigation\">\r" +
    "\n" +
    "        <div class=\"col-sm-6\">\r" +
    "\n" +
    "            <img class=\"pull-left white logo\" ng-src={{loggedUser.photoURL}} alt=\"logo\" />\r" +
    "\n" +
    "            <h4 class=\"intro\"> Hello, {{loggedUser.displayName}}!</h4>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"pull-right\">\r" +
    "\n" +
    "            <button class=\"btn btn-default btn-xs logout\" ng-click=\"fblogout()\"> <i class=\"fa fa-sign-out\" aria-hidden=\"true\" ></i>  LOG OUT </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </nav>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class=\"container-fluid chatroom-body\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"row-height\">\r" +
    "\n" +
    "            <div class=\"col-sm-3 col-sm-height\" >\r" +
    "\n" +
    "                <div ng-show=\"userInRomm\" class=\"alert alert-warning\">\r" +
    "\n" +
    "                    Warning! You are already in this room!\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"spinicon\" ng-show=\"!roomNames\"><i class=\"fa fa-spin fa-spinner fa-5\" aria-hidden=\"true\"></i></div>\r" +
    "\n" +
    "                <div ng-show=\"roomNames\" id=\"roomName\"> {{roomNames.length}} available chat rooms:</div>\r" +
    "\n" +
    "                <div class=\"roomNameDisplay\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <ul class=\"list-group\" ng-if=\"rooms\">\r" +
    "\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"room in rooms\">\r" +
    "\n" +
    "                            <img ng-src=\"{{room.imageUrl}}\" width=\"35px\" height=\"35px\">\r" +
    "\n" +
    "                            {{room.roomName}}\r" +
    "\n" +
    "                            <span class=\"badge\">\r" +
    "\n" +
    "                                {{getCount(room.users)}}\r" +
    "\n" +
    "                            </span> &nbsp;\r" +
    "\n" +
    "                            <button class=\"btn btn-xs pull-right roz\" ng-click=\"joinRoom(room.roomName); listRooms()\" ng-hide=\"hideRooms\">\r" +
    "\n" +
    "                                <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\r" +
    "\n" +
    "                                join\r" +
    "\n" +
    "                            </button>&nbsp;&nbsp;\r" +
    "\n" +
    "                        </li>\r" +
    "\n" +
    "                    </ul>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"buttonCreateRoom\">\r" +
    "\n" +
    "                    <create-room></create-room>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-sm-9\">\r" +
    "\n" +
    "                <!--<img src=\"./components/chat/img/gett.jpg\" >-->\r" +
    "\n" +
    "                <ui-view></ui-view>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
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
    "    <button type=\"button\" class=\"btn\" id=\"newRoomGreen\" data-toggle=\"modal\" data-target=\"#myModal\">\r" +
    "\n" +
    "   <i class=\"fa fa-plus\" aria-hidden=\"true\"></i> <strong>CREATE</strong>\r" +
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
    "        <div class=\"alert alert-warning\">\r" +
    "\n" +
    "          No white spaces or special characters allowed.\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-body\">\r" +
    "\n" +
    "          <img ng-src=\"{{roomImage}}\" width=\"40px\" height=\"40px\">\r" +
    "\n" +
    "          <input type=\"text\" placeholder=' room name' ng-model=\"roomNameCreate\" required/>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div>\r" +
    "\n" +
    "          <ul id=\"roomImages\">\r" +
    "\n" +
    "            <li ng-repeat=\"imageUrl in imagesUrls\">\r" +
    "\n" +
    "              <img ng-src=\"{{imageUrl}}\" ng-click=\"saveRoomImage(imageUrl)\">\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "          </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"modal-footer\">\r" +
    "\n" +
    "          <button type=\"button\" ng-click=\"writeRoomData()\" class=\"btn btn-default\" data-dismiss=\"modal\">Create</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n"
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
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "<div class=\"container-fluid login-container\">\r" +
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
    "          <input type=\"text\" id=\"fieldUser\" class=\"login-input\"  onkeydown=\"if(event.keyCode == 13) document.getElementById('btnLogin').click();\" ng-model=\"username\" required pattern=.*\\S.* />\r" +
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
    "            <div fb-root></div>\r" +
    "\n" +
    "            <button class=\"btn btn-block btn-lg btn-social btn-facebook\" ng-click=\"fblogin(uid)\"><i class=\"fa fa-facebook\"></i>Facebook Login</button>\r" +
    "\n" +
    "          <button class=\"btnbtn\" id=\"btnLogin\" ng-click=\"login(username)\"> Login</button>\r" +
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
