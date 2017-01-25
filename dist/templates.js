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
    "         <div class=\"textRoom\"> Welcome to  {{room}}! \r" +
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
    "       <!--<ul scroll-glue  class=\"messages\" schroll-bottom=\"messages\" id=\"rawText\">-->\r" +
    "\n" +
    "            <!--<li ng-repeat=\"message in messages\" >-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <!--<div class=\"sender\" ng-class=\"{'floatright': loggedUser.displayName == message.sender, 'roomBotImg': message.sender == 'RoomBot' }\">-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <!--<div class=\"sender-message\">-->\r" +
    "\n" +
    "                        <!--<div class=\"sender-photoURL\"><img ng-src=\"{{message.senderPhotoURL}}\"></div>-->\r" +
    "\n" +
    "                        <!--<div class=\"test\"><span class=\"white\" >{{message.sender}}</span></div>-->\r" +
    "\n" +
    "                    <!--</div>-->\r" +
    "\n" +
    "                        <!--<div ng-class=\"{'custom': loggedUser.displayName == message.sender}\"  class=\"text-message\"  ng-bind-html=\"message.text | linky | emoji \" >{{message.text}}</div>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <!--</div>-->\r" +
    "\n" +
    "                <!---->\r" +
    "\n" +
    "            <!--</li>-->\r" +
    "\n" +
    "        <!--</ul>-->\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <ul scroll-glue class=\"\r" +
    "\n" +
    "        messages\" id=\"rawText\">\r" +
    "\n" +
    "            <li ng-repeat=\"message in messages\">\r" +
    "\n" +
    "                <div class=\"sender\"\r" +
    "\n" +
    "                     ng-class=\"{'floatright': loggedUser.displayName == message.sender, 'roomBotImg': message.sender == 'RoomBot' }\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"sender-message\">\r" +
    "\n" +
    "                        <div class=\"sender-photoURL\"><img ng-src=\"{{message.senderPhotoURL}}\"></div>\r" +
    "\n" +
    "                        <div class=\"test\"><span class=\"white\">{{message.sender}}</span></div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"checkIfYoutubelink(message.text)\"\r" +
    "\n" +
    "                         ng-class=\"{'custom': loggedUser.displayName == message.sender}\"\r" +
    "\n" +
    "                         class=\"text-message\">\r" +
    "\n" +
    "                        <a target=\"_blank\" href=\"{{message.text}}\">\r" +
    "\n" +
    "                            <img class=\"youtube-img\" src=\" https://img.youtube.com/vi/{{getYouTubeId(message.text)}}/1.jpg\">\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"checkIfImg(message.text)\"\r" +
    "\n" +
    "                         ng-class=\"{'custom': loggedUser.displayName == message.sender}\"\r" +
    "\n" +
    "                         class=\"text-message\">\r" +
    "\n" +
    "                        <a target=\"_blank\" href=\"{{message.text}}\">\r" +
    "\n" +
    "                            <img class=\"link-img\" ng-src=\"{{message.text}}\">\r" +
    "\n" +
    "                        </a>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div ng-if=\"!checkIfYoutubelink(message.text) && !checkIfImg(message.text)\"\r" +
    "\n" +
    "                         ng-class=\"{'custom': loggedUser.displayName == message.sender}\" class=\"text-message\"\r" +
    "\n" +
    "                         ng-bind-html=\"message.text | linky | emoji \">{{message.text}}\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </li>\r" +
    "\n" +
    "        </ul>\r" +
    "\n" +
    "\r" +
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
    "                <i class=\"fa fa-chevron-circle-down green\" aria-hidden=\"true\"></i> <a ng-click=\"userDetails(activeuser)\">{{activeuser.displayName}}</a> <i ng-show=\"loggedUser.displayName == roomCreator && activeuser.displayName != roomCreator\" ng-click=\"kick(activeuser)\" class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\r" +
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


  $templateCache.put('components/chat-room/user-details.html',
    "<h2>User Details:</h2>\r" +
    "\n" +
    "<div class=\"user.displayName\">{{user.displayName}}</div>\r" +
    "\n" +
    "<div class=\"user.photoURL\"> <img ng-src=\"{{user.photoURL}}\"></div>"
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
    "\r" +
    "\n" +
    "            <button class=\"btn btn-default btn-xs logout\" ng-click=\"logout()\" > <i class=\"fa fa-sign-out\" aria-hidden=\"true\" ></i>  LOG OUT </button>\r" +
    "\n" +
    "\r" +
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
    "                            <button class=\"btn btn-xs pull-right roz\" ng-click=\"joinRoom(room.roomName); listRooms();\" ng-hide=\"config.hideRooms\">\r" +
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
    "\r" +
    "\n" +
    "<div class=\"container-fluid login-container\">\r" +
    "\n" +
    "    <div class=\"login-options\">\r" +
    "\n" +
    "        <div >\r" +
    "\n" +
    "            <a  ng-click=\"fblogin(uid)\"><span class=\"hb hb-md hb-custom\"><i class=\"fa fa-facebook\"></i></span></a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div >\r" +
    "\n" +
    "            <a  ng-click=\"githublogin(uid)\"><span class=\"hb hb-md hb-custom\"><i class=\"fa fa-github\"></i></span></a>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "<script>\r" +
    "\n" +
    "  jQuery(function(){ \r" +
    "\n" +
    "	jQuery(\".hb-lg\").parent().addClass(\"hb-lg-margin\");\r" +
    "\n" +
    "	jQuery(\".hb-md\").parent().addClass(\"hb-md-margin\");\r" +
    "\n" +
    "	jQuery(\".hb-sm\").parent().addClass(\"hb-sm-margin\");\r" +
    "\n" +
    "	jQuery(\".hb-xs\").parent().addClass(\"hb-xs-margin\");\r" +
    "\n" +
    "})\r" +
    "\n" +
    "\r" +
    "\n" +
    "jQuery(function(){ \r" +
    "\n" +
    "	//Facebook\r" +
    "\n" +
    "	jQuery( \".hb .fa-facebook,.hb .fa-facebook-square\").parent().addClass(\"hb-facebook\");\r" +
    "\n" +
    "	jQuery( \".hb.inv .fa-facebook,.hb.inv .fa-facebook-square\").parent().addClass(\"hb-facebook-inv\").removeClass(\"hb-facebook\");\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "	//Github\r" +
    "\n" +
    "	jQuery( \".hb .fa-github,.hb .fa-github-square, .hb .fa-github-alt\").parent().addClass(\"hb-github\");\r" +
    "\n" +
    "	jQuery( \".hb.inv .fa-github,.hb.inv .fa-github-square, .hb.inv .fa-github-alt\").parent().addClass(\"hb-github-inv\").removeClass(\"hb-github\");\r" +
    "\n" +
    "\r" +
    "\n" +
    "	\r" +
    "\n" +
    "\r" +
    "\n" +
    "});\r" +
    "\n" +
    "\r" +
    "\n" +
    "</script>\r" +
    "\n" +
    "\r" +
    "\n"
  );

}]);
