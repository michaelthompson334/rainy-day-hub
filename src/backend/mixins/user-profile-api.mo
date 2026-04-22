import Types      "../types/user-profile";
import ProfileLib  "../lib/user-profile";
import Principal   "mo:core/Principal";
import Runtime     "mo:core/Runtime";

mixin (profiles : ProfileLib.ProfileStore) {
  /// Adds a link to the authenticated caller's favorites list
  public shared ({ caller }) func addFavorite(linkId : Text) : async () {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.addFavorite(profiles, caller, linkId);
  };

  /// Removes a link from the authenticated caller's favorites list
  public shared ({ caller }) func removeFavorite(linkId : Text) : async () {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.removeFavorite(profiles, caller, linkId);
  };

  /// Returns the authenticated caller's saved favorite link ids
  public shared ({ caller }) func getFavorites() : async [Text] {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.getFavorites(profiles, caller);
  };

  /// Persists a single chat message to the authenticated caller's history
  public shared ({ caller }) func saveChatMessage(entry : Types.ChatHistoryEntry) : async () {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.saveChatMessage(profiles, caller, entry);
  };

  /// Returns the authenticated caller's full chat history
  public shared ({ caller }) func getChatHistory() : async [Types.ChatHistoryEntry] {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.getChatHistory(profiles, caller);
  };

  /// Clears the authenticated caller's entire chat history
  public shared ({ caller }) func clearChatHistory() : async () {
    if (caller.isAnonymous()) Runtime.trap("Anonymous callers are not allowed");
    ProfileLib.clearChatHistory(profiles, caller);
  };
};
