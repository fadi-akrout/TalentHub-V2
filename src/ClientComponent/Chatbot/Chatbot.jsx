import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

function Chatbot() {
  const { userId } = useAuth();

  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "de41f27ecfda9d2b2b3a8b0bbffbb4a3",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        userId: userId, // Replace UNIQUE_USER_ID with the actual user ID
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, [userId]);

 /*  const clearConversation = () => {
    if (window.kommunicate) {
      window.kommunicate.conversation.clearConversation(function (response) {
        if (response === "Success") {
          console.log("Conversation cleared successfully");
        } else {
          console.log("Failed to clear conversation");
        }
      });
    }
  }; */

  return (
    <div>
     {/*  <button onClick={clearConversation}>Clear Conversation</button> */}
    </div>
  );
}

export default Chatbot;