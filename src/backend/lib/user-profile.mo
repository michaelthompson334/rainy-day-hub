import Types "../types/user-profile";
import Map    "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public type ProfileStore = Map.Map<Principal, Types.UserProfile>;

  let emptyProfile : Types.UserProfile = {
    favorites   = [];
    chatHistory = [];
  };

  /// Returns the profile for the given principal, creating a default one if absent
  public func getOrCreate(store : ProfileStore, caller : Principal) : Types.UserProfile {
    switch (store.get(caller)) {
      case (?p) p;
      case null {
        store.add(caller, emptyProfile);
        emptyProfile;
      };
    };
  };

  /// Adds a favorite link id to the caller's profile; no-op if already present
  public func addFavorite(store : ProfileStore, caller : Principal, linkId : Text) {
    let profile = getOrCreate(store, caller);
    if (profile.favorites.find(func(f : Text) : Bool { f == linkId }) == null) {
      store.add(caller, { profile with favorites = profile.favorites.concat([linkId]) });
    };
  };

  /// Removes a favorite link id from the caller's profile; no-op if absent
  public func removeFavorite(store : ProfileStore, caller : Principal, linkId : Text) {
    let profile = getOrCreate(store, caller);
    let updated = profile.favorites.filter(func(f : Text) : Bool { f != linkId });
    store.add(caller, { profile with favorites = updated });
  };

  /// Returns the current list of favorites for the caller
  public func getFavorites(store : ProfileStore, caller : Principal) : [Text] {
    getOrCreate(store, caller).favorites;
  };

  /// Appends a chat message to the caller's history
  public func saveChatMessage(store : ProfileStore, caller : Principal, entry : Types.ChatHistoryEntry) {
    let profile = getOrCreate(store, caller);
    store.add(caller, { profile with chatHistory = profile.chatHistory.concat([entry]) });
  };

  /// Returns the full chat history for the caller (insertion order)
  public func getChatHistory(store : ProfileStore, caller : Principal) : [Types.ChatHistoryEntry] {
    getOrCreate(store, caller).chatHistory;
  };

  /// Clears all chat history for the caller
  public func clearChatHistory(store : ProfileStore, caller : Principal) {
    let profile = getOrCreate(store, caller);
    store.add(caller, { profile with chatHistory = [] });
  };
};
