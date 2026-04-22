module {
  /// A single chat history entry saved by the user
  public type ChatHistoryEntry = {
    id        : Text;
    role      : Text;
    content   : Text;
    timestamp : Int;
  };

  /// Per-user profile stored in canister state
  public type UserProfile = {
    favorites    : [Text];
    chatHistory  : [ChatHistoryEntry];
  };
};
