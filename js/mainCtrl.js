angular.module('chatroom').controller('mainCtrl', function ($scope, messageService)
{
    //The getMessages function will call the getMessages method on the messageService object.
    //You'll then save the result of that request to your controller's $scope as messages ($scope.messages)
    $scope.getMessages = function (log)
    {
        messageService.getMessages().then(function (success)
        {
            $scope.messages = success.data;
            $scope.messages.forEach(function (message, i)
            {
                message.color = i % 2 === 0 ? 'blue-message' : 'gray-message'
            });
            if (log)
            {
                console.log($scope.messages);
            }
        });
    };
    $scope.getMessages(true);

    //The postMessage function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
    //pass that text to the postMessage method on the messageService object which will
    //then post it to the backend.
    $scope.postMessage = function (message)
    {
        if(message.trim() === 'DELETE')
        {
            messageService.deleteMessage();
        }
        else
        {
            $scope.messages.push({message: 'posting message...'});
            messageService.postMessage(message).then(function (success)
            {
                $scope.getMessages();
            });
        }
        $scope.message = '';
    };

    $scope.timestampToDate = function (messageObj)
    {
        return messageService.timestampToDate(messageObj.createdAt);
    }

    //uncomment this code when your getMessages function is finished
    //This goes and gets new data every second, which mimicking a chat room experience.
    setInterval(function ()
    {
        $scope.getMessages();

    }, 1500)

})
