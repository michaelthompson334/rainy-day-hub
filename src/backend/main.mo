import AiChatMixin     "mixins/ai-chat-api";
import UserProfileMixin "mixins/user-profile-api";
import Map              "mo:core/Map";

actor {
  let profiles = Map.empty<Principal, { favorites : [Text]; chatHistory : [{ id : Text; role : Text; content : Text; timestamp : Int }] }>();

  include AiChatMixin();
  include UserProfileMixin(profiles);
};
